export default function Apply() {
    return (
        <div
            style={{
                padding: '32px 16px',
                background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
                minHeight: '100vh',
            }}
        >
            <div
                style={{
                    maxWidth: 920,
                    margin: '0 auto',
                    lineHeight: 1.7,
                    padding: '28px 28px 32px',
                    backgroundColor: '#0b1220',
                    borderRadius: 20,
                    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.45)',
                    color: '#e5e7eb',
                }}
            >
                <h1 style={{ marginTop: 0, color: '#93c5fd' }}>報名參加</h1>
                <img
                    src="/apply-poster.png"
                    alt="點子集氣箱2.0 海報"
                    style={{
                        width: '100%',
                        maxWidth: 700,
                        borderRadius: 14,
                        marginBottom: 24,
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />

                <p style={{ fontSize: 26, fontWeight: 800, color: '#fbbf24', marginBottom: 12 }}>
                    點子集氣箱2.0 凱旋回歸啦！🎁
                </p>

                <p style={{ margin: '0 8px 16px', fontSize: 18, color: '#d1d5db' }}>
                    好玩又有意義 - 你有idea 🧠，有人👯‍♂️，我哋就幫你實現你哋嘅夢想😉。
                    <br />
                    儲到義工時數之餘，又可以有津貼 💰，點子2.0等着你一齊集氣！
                </p>

                <p style={{ margin: '8px 8px 12px', fontSize: 20, fontWeight: 700, color: '#93c5fd' }}>
                    📅 計劃重要日期
                </p>
                <div style={{ margin: '0 8px 22px', overflowX: 'auto', textAlign: 'center' }}>
                    <table
                        style={{
                            width: 'auto',
                            borderCollapse: 'separate',
                            borderSpacing: 0,
                            minWidth: 'unset',
                            borderRadius: 12,
                            overflow: 'hidden',
                            display: 'inline-table',
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: '#1d4ed8', color: '#f8fafc' }}>
                                <th style={{ textAlign: 'left', padding: '12px 14px' }}>活動項目</th>
                                <th style={{ textAlign: 'left', padding: '12px 14px' }}>日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ backgroundColor: '#172036' }}>
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>截止報名日期 📆</td>
                                <td style={{ padding: '12px 14px' }}>25/4/2026</td>
                            </tr>
                            <tr style={{ backgroundColor: '#1f2a44' }}>
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>簡介日 💛</td>
                                <td style={{ padding: '12px 14px' }}>9/5/2026</td>
                            </tr>
                            <tr style={{ backgroundColor: '#172036' }}>
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Pitching 👄</td>
                                <td style={{ padding: '12px 14px' }}>23/5/2026</td>
                            </tr>
                            <tr style={{ backgroundColor: '#1f2a44' }}>
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>計劃推行日期 🙌🏻</td>
                                <td style={{ padding: '12px 14px' }}>6/2026-8/2026</td>
                            </tr>
                            <tr style={{ backgroundColor: '#172036' }}>
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>結業禮 🎓</td>
                                <td style={{ padding: '12px 14px' }}>3/10/2026</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p style={{ margin: '0 8px 14px', fontWeight: 700, color: '#22d3ee' }}>@AKA #齊集氣</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '0 8px', justifyContent: 'center' }}>
                    <a
                        href="https://forms.gle/ECy8nCQHy2JUFeyZ7"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            textDecoration: 'none',
                            backgroundColor: '#3b82f6',
                            color: '#ffffff',
                            padding: '10px 16px',
                            borderRadius: 999,
                            fontWeight: 700,
                            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.35)',
                        }}
                    >
                        📝 Google Form
                    </a>
                    <a
                        href="https://share.jc21c.net/event/69b3ae5532d88fa31e4a4415"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            textDecoration: 'none',
                            backgroundColor: '#14b8a6',
                            color: '#06202a',
                            padding: '10px 16px',
                            borderRadius: 999,
                            fontWeight: 700,
                            boxShadow: '0 8px 20px rgba(20, 184, 166, 0.35)',
                        }}
                    >
                        🚀 Tomo Link
                    </a>
                </div>
            </div>
        </div>
    )
}


