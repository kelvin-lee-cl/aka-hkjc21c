import heroImg from '../landing_page/Top banner.png'
import planImg from '../landing_page/計劃內容.JPG'
import processImg from '../landing_page/點子孵化進程.png'
import Slider from '../components/Slider'
import { useEffect, useState } from 'react'
import { auth, app } from '../firebase'
// import { signInAnonymously } from 'firebase/auth'
import sample1 from '../subpage/1.png'
import sample2 from '../subpage/2.png'
import sample3 from '../subpage/3.png'
import sample4 from '../subpage/4.png'
import sample5 from '../subpage/5.png'
import sample6 from '../subpage/6.png'
import sample7 from '../subpage/7.png'
import sample8 from '../subpage/8.png'
import sample9 from '../subpage/9.png'
import sample10 from '../subpage/10.png'

export default function Home() {
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('aka_is_admin') === 'true')
    const [sliderImages, setSliderImages] = useState<string[] | null>(null)
    const [showDebug, setShowDebug] = useState(false)
    const [lastError, setLastError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadNote, setUploadNote] = useState<string | null>(null)

    const defaultSliderImages = [sample1, sample2, sample3, sample4, sample5, sample6, sample7, sample8, sample9, sample10]

    useEffect(() => {
        const load = async () => {
            try {
                const resp = await fetch('/.netlify/functions/slider')
                if (resp.ok) {
                    const data = await resp.json()
                    if (Array.isArray(data) && data.length > 0) {
                        setSliderImages(data as string[])
                        return
                    }
                }
            } catch { }
            // Fallback to localStorage or default images
            const local = localStorage.getItem('aka_slider_images')
            if (local) setSliderImages(JSON.parse(local))
            else setSliderImages(defaultSliderImages)
        }
        load()
        const onAdmin = () => setIsAdmin(localStorage.getItem('aka_is_admin') === 'true')
        window.addEventListener('adminStateChange', onAdmin)
        return () => {
            window.removeEventListener('adminStateChange', onAdmin)
        }
    }, [])

    const saveSliderImages = async (images: string[]) => {
        const sanitized = (images || []).map((s) => s.trim()).filter((s) => s.length > 0)
        setSliderImages(sanitized)
        localStorage.setItem('aka_slider_images', JSON.stringify(sanitized))
        try {
            const resp = await fetch('/.netlify/functions/slider', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sanitized)
            })
            if (!resp.ok) throw new Error(await resp.text())
        } catch (e) {
            console.error('[Firestore] save slider images failed', e)
            setLastError(e instanceof Error ? e.message : String(e))
            alert('儲存失敗，請稍後再試或檢查權限。')
        }
    }
    const addEmptyImage = () => {
        const next = [...(sliderImages || [])]
        next.push('')
        setSliderImages(next)
    }
    const bulkAddByPrompt = async () => {
        const input = prompt('貼上多個圖片 URL（每行一個）:')
        if (!input) return
        const urls = input.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
        if (urls.length === 0) return
        const next = [...(sliderImages || []), ...urls]
        await saveSliderImages(next)
        alert(`已新增 ${urls.length} 張圖片`)
    }
    const exportJson = async () => {
        const data = JSON.stringify(sliderImages || [], null, 2)
        try {
            await navigator.clipboard.writeText(data)
            alert('已複製 JSON 至剪貼簿')
        } catch {
            alert(data)
        }
    }
    const importJson = async () => {
        const input = prompt('貼上 JSON（字串陣列）:')
        if (!input) return
        try {
            const parsed = JSON.parse(input)
            if (!Array.isArray(parsed) || !parsed.every((v: any) => typeof v === 'string')) throw new Error('格式錯誤')
            await saveSliderImages(parsed as string[])
            alert('已套用 JSON')
        } catch (e) {
            alert('JSON 解析失敗，請確認格式。')
            console.error(e)
        }
    }
    const readFileAsBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => reject(new Error('read file failed'))
        reader.onload = () => {
            const result = reader.result as string
            const base64 = result.split(',')[1] || ''
            resolve(base64)
        }
        reader.readAsDataURL(file)
    })
    const appendUploadImages = async () => {
        try {
            console.groupCollapsed('[Upload-CDN] Append images')
            console.log('origin', location.origin)
            console.log('projectId', app.options.projectId)
            console.log('auth.currentUser', (auth as any).currentUser?.uid)
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = 'image/*'
            input.multiple = true
            input.name = 'files'
            input.onchange = async () => {
                const files = input.files ? Array.from(input.files) : []
                if (files.length === 0) {
                    console.log('file picker closed without selection')
                    setUploadNote('未選擇檔案')
                    console.groupEnd()
                    return
                }
                setIsUploading(true)
                setUploadNote('上傳中...')
                const uploadedUrls: string[] = []
                for (let idx = 0; idx < files.length; idx++) {
                    const file = files[idx]
                    console.log('file', { name: file.name, size: file.size, type: file.type })
                    try {
                        setUploadNote(`上傳中... (${idx + 1}/${files.length})`)
                        const dataBase64 = await readFileAsBase64(file)
                        const resp = await fetch('/.netlify/functions/uploadImage', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ filename: file.name, contentType: file.type, dataBase64 })
                        })
                        if (!resp.ok) throw new Error(await resp.text())
                        const { url } = await resp.json()
                        uploadedUrls.push(url)
                        console.log('uploaded url', url)
                    } catch (e) {
                        console.error('[CDN Upload] failed', e)
                        setLastError(e instanceof Error ? e.message : String(e))
                        alert('上傳失敗，請檢查 Netlify 環境變數與 GitHub 權限。')
                        setIsUploading(false)
                        console.groupEnd()
                        return
                    }
                }
                const existing = sliderImages || []
                await saveSliderImages([...existing, ...uploadedUrls])
                setUploadNote('上傳完成')
                setIsUploading(false)
                setTimeout(() => setUploadNote(null), 1500)
                console.groupEnd()
            }
            input.click()
        } catch { }
    }
    // Upload-related actions removed in favor of URL-based management

    const moveImage = (index: number, direction: 'up' | 'down') => {
        if (!sliderImages) return
        const next = [...sliderImages]
        const target = direction === 'up' ? index - 1 : index + 1
        if (target < 0 || target >= next.length) return
        const tmp = next[index]
        next[index] = next[target]
        next[target] = tmp
        setSliderImages(next)
    }
    return (
        <>
            <section style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: 0 }}>
                <div style={{ width: '100%' }}>
                    <img src={heroImg} alt="Hero" style={{ display: 'block', margin: '0 auto', maxWidth: '80%', width: 'auto', height: 'auto', objectFit: 'contain' }} />
                    <p style={{ maxWidth: '70%', margin: '50px auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        「點子集氣箱」青年自主資助計劃由香港賽馬會慈善信託基金策劃及捐助，並由香港仔坊會社會服務賽馬會綜合服務處主辦。
                    </p>
                    <div style={{ maxWidth: '78%', margin: '16px auto 0', background: '#333333', padding: '20px 16px', borderRadius: 8 }}>
                        <div className="blackBoxGrid">
                            <div style={{ textAlign: 'left' }}>
                                <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#5588df' }}>計劃內容</h2>
                                <p style={{ marginTop: 12, lineHeight: 1.2, fontSize: '1rem', color: '#ffffff' }}>
                                    這個計劃的目標是鼓勵青年人在社區中發起並領導具有推動力的項目。透過參與計劃，申請隊伍將有機會學習新技能、發揮才能、創意和愛心，以實踐他們對社區的理念及想法，並回應社區的需求。
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={planImg} alt="計劃內容" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }} />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                        <img src={processImg} alt="點子孵化進程" style={{ width: '80%', height: 'auto', display: 'block' }} />
                    </div>
                </div>
            </section>

            {/* 學生作品 */}
            <section style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                <div style={{ maxWidth: '80%', width: '100%' }}>
                    <h2 style={{ textAlign: 'left', margin: '0 0 12px 0', color: '#5588df' }}>學生作品</h2>
                    {sliderImages && <Slider images={sliderImages} altPrefix="學生作品" />}

                    {isAdmin && sliderImages && (
                        <div style={{ marginTop: 12, padding: 12, border: '1px dashed #ccc', borderRadius: 6 }}>
                            <h3 style={{ margin: '0 0 8px 0' }}>管理 Slider 圖片</h3>
                            <div style={{ margin: '6px 0 12px 0' }}>
                                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                    <input type="checkbox" checked={showDebug} onChange={(e) => setShowDebug(e.target.checked)} />
                                    <span>顯示除錯資訊</span>
                                </label>
                            </div>
                            {showDebug && (
                                <div style={{ fontFamily: 'monospace', fontSize: 12, background: '#fafafa', border: '1px solid #eee', borderRadius: 6, padding: 10, marginBottom: 12 }}>
                                    <div><b>origin:</b> {location.origin}</div>
                                    <div><b>projectId:</b> {app.options.projectId as string}</div>
                                    <div><b>storageBucket:</b> {app.options.storageBucket as string}</div>
                                    <div><b>auth.uid:</b> {auth.currentUser?.uid || '(none)'}</div>
                                    {lastError && <div style={{ color: '#c0392b' }}><b>lastError:</b> {lastError}</div>}
                                </div>
                            )}
                            <div style={{ display: 'grid', gap: 8 }}>
                                {uploadNote && (
                                    <div style={{ padding: '8px 10px', borderRadius: 6, background: '#eef5ff', border: '1px solid #cfe2ff', color: '#1557b0' }}>
                                        {isUploading ? '處理中...' : uploadNote}
                                    </div>
                                )}
                                {sliderImages.map((url, i) => (
                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto auto auto', gap: 8, alignItems: 'center' }}>
                                        {url ? (
                                            <img src={url} alt={`img ${i + 1}`} style={{ width: 80, height: 48, objectFit: 'cover', borderRadius: 4, background: '#eee' }} />
                                        ) : (
                                            <div style={{ width: 80, height: 48, borderRadius: 4, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>無圖</div>
                                        )}
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => {
                                                const next = [...sliderImages]
                                                next[i] = e.target.value
                                                setSliderImages(next)
                                            }}
                                            onBlur={() => saveSliderImages(sliderImages || [])}
                                            placeholder="輸入圖片 URL"
                                            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #ddd' }}
                                        />
                                        <button
                                            className="btn"
                                            onClick={() => moveImage(i, 'up')}
                                        >上移</button>
                                        <button
                                            className="btn"
                                            onClick={() => moveImage(i, 'down')}
                                        >下移</button>
                                        <button
                                            className="btn"
                                            style={{ background: '#c0392b' }}
                                            onClick={() => {
                                                const next = sliderImages.filter((_, idx) => idx !== i)
                                                saveSliderImages(next)
                                            }}
                                        >刪除</button>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button
                                        className="btn"
                                        onClick={addEmptyImage}
                                    >新增一張</button>
                                    <button
                                        className="btn"
                                        onClick={bulkAddByPrompt}
                                    >批量新增（貼上 URL）</button>
                                    <button
                                        className="btn"
                                        disabled={isUploading}
                                        onClick={appendUploadImages}
                                    >上傳圖片</button>
                                    <button
                                        className="btn"
                                        onClick={() => saveSliderImages(sliderImages || [])}
                                    >儲存全部</button>
                                    <button
                                        className="btn"
                                        onClick={exportJson}
                                    >匯出 JSON</button>
                                    <button
                                        className="btn"
                                        onClick={importJson}
                                    >匯入 JSON</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}


