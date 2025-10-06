import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function WorkDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [workImages, setWorkImages] = useState<string[] | null>(null)
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('aka_is_admin') === 'true')
    const [showDebug, setShowDebug] = useState(false)
    const [lastError, setLastError] = useState<string | null>(null)

    const workIndex = parseInt(id || '1') - 1

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
            // Fallback to localStorage
            const local = localStorage.getItem('aka_work_images')
            if (local) setWorkImages(JSON.parse(local))
        }
        load()
        const onAdmin = () => setIsAdmin(localStorage.getItem('aka_is_admin') === 'true')
        window.addEventListener('adminStateChange', onAdmin)
        return () => {
            window.removeEventListener('adminStateChange', onAdmin)
        }
    }, [])

    const currentImage = workImages && workImages[workIndex]

    if (!workImages || !currentImage) {
        return (
            <div style={{ padding: 24, textAlign: 'center' }}>
                <h2>載入中...</h2>
            </div>
        )
    }

    return (
        <div style={{ padding: 24 }}>
            {/* Navigation */}
            <div style={{ marginBottom: 24 }}>
                <button
                    className="btn"
                    onClick={() => navigate('/works')}
                    style={{ marginRight: 12 }}
                >
                    ← 返回作品列表
                </button>
                {workIndex > 0 && (
                    <button
                        className="btn"
                        onClick={() => navigate(`/works/${workIndex}`)}
                        style={{ marginRight: 12 }}
                    >
                        ← 上一個作品
                    </button>
                )}
                {workIndex < workImages.length - 1 && (
                    <button
                        className="btn"
                        onClick={() => navigate(`/works/${workIndex + 2}`)}
                    >
                        下一個作品 →
                    </button>
                )}
            </div>

            {/* Work Display */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: 24,
                    color: '#5588df',
                    fontSize: '2.5rem'
                }}>
                    作品 {workIndex + 1}
                </h1>

                <div style={{
                    width: '100%',
                    maxWidth: '800px',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    background: '#fff'
                }}>
                    <img
                        src={currentImage}
                        alt={`Work ${workIndex + 1}`}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block'
                        }}
                    />
                </div>

                <div style={{
                    marginTop: 24,
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '1.1rem'
                }}>
                    <p>點擊圖片可查看大圖</p>
                </div>
            </div>

            {/* Admin Panel */}
            {isAdmin && (
                <div style={{
                    marginTop: 40,
                    padding: 20,
                    border: '1px dashed #ccc',
                    borderRadius: 8,
                    background: '#f8f9fa'
                }}>
                    <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>管理此作品</h3>

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
                            <div><b>作品編號:</b> {workIndex + 1}</div>
                            <div><b>圖片 URL:</b> {currentImage}</div>
                            {lastError && <div style={{ color: '#c0392b' }}><b>lastError:</b> {lastError}</div>}
                        </div>
                    )}

                    <div style={{ display: 'grid', gap: 12 }}>
                        <div style={{
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
                                src={currentImage}
                                alt={`Work ${workIndex + 1}`}
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
                                value={currentImage}
                                onChange={(e) => {
                                    const next = [...workImages]
                                    next[workIndex] = e.target.value
                                    setWorkImages(next)
                                }}
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
                                onClick={async () => {
                                    try {
                                        const resp = await fetch('/.netlify/functions/works', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(workImages)
                                        })
                                        if (!resp.ok) throw new Error(await resp.text())
                                        alert('儲存成功')
                                    } catch (e) {
                                        console.error('[Work] save failed', e)
                                        setLastError(e instanceof Error ? e.message : String(e))
                                        alert('儲存失敗，請稍後再試。')
                                    }
                                }}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '14px'
                                }}
                            >
                                儲存
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
