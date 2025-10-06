import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import topBanner from '../subpage/Top banner.png'
import work1 from '../subpage/1.png'
import work2 from '../subpage/2.png'
import work3 from '../subpage/3.png'
import work4 from '../subpage/4.png'
import work5 from '../subpage/5.png'
import work6 from '../subpage/6.png'
import work7 from '../subpage/7.png'
import work8 from '../subpage/8.png'
import work9 from '../subpage/9.png'
import work10 from '../subpage/10.png'

export default function Works() {
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('aka_is_admin') === 'true')
    const [workImages, setWorkImages] = useState<string[] | null>(null)
    const [showDebug, setShowDebug] = useState(false)
    const [lastError, setLastError] = useState<string | null>(null)

    const defaultImages = [work1, work2, work3, work4, work5, work6, work7, work8, work9, work10]

    useEffect(() => {
        const load = async () => {
            try {
                const resp = await fetch('/.netlify/functions/works')
                if (resp.ok) {
                    const data = await resp.json()
                    if (Array.isArray(data)) {
                        setWorkImages(data as string[])
                        return
                    }
                }
            } catch { }
            // Fallback to default images
            setWorkImages(defaultImages)
        }
        load()
        const onAdmin = () => setIsAdmin(localStorage.getItem('aka_is_admin') === 'true')
        window.addEventListener('adminStateChange', onAdmin)
        return () => {
            window.removeEventListener('adminStateChange', onAdmin)
        }
    }, [])

    const saveWorkImages = async (images: string[]) => {
        const sanitized = (images || []).map((s) => s.trim()).filter((s) => s.length > 0)
        setWorkImages(sanitized)
        localStorage.setItem('aka_work_images', JSON.stringify(sanitized))
        try {
            const resp = await fetch('/.netlify/functions/works', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sanitized)
            })
            if (!resp.ok) throw new Error(await resp.text())
        } catch (e) {
            console.error('[Works] save failed', e)
            setLastError(e instanceof Error ? e.message : String(e))
            alert('儲存失敗，請稍後再試或檢查權限。')
        }
    }

    const handleWorkClick = (index: number) => {
        navigate(`/works/${index + 1}`)
    }

    const updateWorkImage = (index: number, url: string) => {
        if (!workImages) return
        const next = [...workImages]
        next[index] = url
        setWorkImages(next)
    }

    const saveWorkImage = async () => {
        if (!workImages) return
        await saveWorkImages(workImages)
    }

    return (
        <div style={{ padding: 24 }}>
            {/* Hero Section */}
            <section style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
                <img
                    src={topBanner}
                    alt="Top Banner"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 8,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                />
            </section>

            {/* Works Grid */}
            <section>
                <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#5588df', fontSize: '2rem' }}>
                    學生作品展示
                </h2>

                {workImages && (
                    <div className="works-grid">
                        {workImages.map((image, index) => (
                            <div
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease',
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                                onClick={() => handleWorkClick(index)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)'
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`Work ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        display: 'block'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Admin Panel */}
                {isAdmin && workImages && (
                    <div style={{
                        marginTop: 40,
                        padding: 20,
                        border: '1px dashed #ccc',
                        borderRadius: 8,
                        background: '#f8f9fa'
                    }}>
                        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>管理作品圖片</h3>

                        <div style={{ margin: '8px 0 16px 0' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={showDebug}
                                    onChange={(e) => setShowDebug(e.target.checked)}
                                />
                                <span>顯示除錯資訊</span>
                            </label>
                        </div>

                        {showDebug && (
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: 12,
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: 6,
                                padding: 12,
                                marginBottom: 16
                            }}>
                                <div><b>作品數量:</b> {workImages.length}</div>
                                {lastError && <div style={{ color: '#c0392b' }}><b>lastError:</b> {lastError}</div>}
                            </div>
                        )}

                        <div style={{ display: 'grid', gap: 12 }}>
                            {workImages.map((url, i) => (
                                <div key={i} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '80px 1fr auto',
                                    gap: 12,
                                    alignItems: 'center',
                                    padding: 12,
                                    background: '#fff',
                                    borderRadius: 6,
                                    border: '1px solid #ddd'
                                }}>
                                    <img
                                        src={url}
                                        alt={`Work ${i + 1}`}
                                        style={{
                                            width: 80,
                                            height: 60,
                                            objectFit: 'cover',
                                            borderRadius: 4,
                                            background: '#eee'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => updateWorkImage(i, e.target.value)}
                                        onBlur={() => saveWorkImage()}
                                        placeholder="輸入圖片 URL"
                                        style={{
                                            width: '100%',
                                            padding: '8px 12px',
                                            borderRadius: 6,
                                            border: '1px solid #ddd',
                                            fontSize: '14px'
                                        }}
                                    />
                                    <button
                                        className="btn"
                                        onClick={() => saveWorkImage()}
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        儲存
                                    </button>
                                </div>
                            ))}

                            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                                <button
                                    className="btn"
                                    onClick={() => saveWorkImages(workImages)}
                                    style={{ padding: '10px 20px' }}
                                >
                                    儲存全部
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        const data = JSON.stringify(workImages, null, 2)
                                        navigator.clipboard.writeText(data)
                                        alert('已複製 JSON 至剪貼簿')
                                    }}
                                    style={{ padding: '10px 20px' }}
                                >
                                    匯出 JSON
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}


