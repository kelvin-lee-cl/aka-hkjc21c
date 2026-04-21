import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { WORK_DETAILS } from '../data/workDetails'
import Slider from '../components/Slider'

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [workImages, setWorkImages] = useState<string[] | null>(null)

  const workIndex = parseInt(id || '1', 10) - 1

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch('/.netlify/functions/works')
        if (resp.ok) {
          const data = await resp.json()
          if (Array.isArray(data) && data.length > 0) {
            setWorkImages(data as string[])
            return
          }
        }
      } catch { }
      setWorkImages(null)
    }
    load()
  }, [])

  const workData = useMemo(() => WORK_DETAILS[workIndex], [workIndex])

  if (!workData) {
    return (
      <div className="work-detail-page">
        <div className="work-detail-shell">
          <h2 className="work-detail-title">找不到此作品</h2>
          <button className="btn" onClick={() => navigate('/works')}>
            返回作品列表
          </button>
        </div>
      </div>
    )
  }

  const coverImage = workImages?.[workIndex] || workData.image
  const formattedTitle = (() => {
    const text = workData.title.trim()
    if (!text) return text

    // For Chinese titles without spaces, split as 5 + 6 when long.
    if (!/\s/.test(text) && text.length > 10) {
      return `${text.slice(0, 5)}\n${text.slice(5, 11)}`
    }

    // For titles with spaces, split after 5 words when long.
    const words = text.split(/\s+/).filter(Boolean)
    if (words.length > 5) {
      return `${words.slice(0, 5).join(' ')}\n${words.slice(5, 11).join(' ')}`
    }

    return text
  })()

  return (
    <div className="work-detail-page">
      <div className="work-detail-shell">
        <div className="work-detail-nav">
          <button className="btn" onClick={() => navigate('/works')}>
            ← 返回作品列表
          </button>
          <div className="work-detail-nav-group">
            {workIndex > 0 && (
              <button className="btn" onClick={() => navigate(`/works/${workIndex}`)}>
                ← 上一個
              </button>
            )}
            {workIndex < WORK_DETAILS.length - 1 && (
              <button className="btn" onClick={() => navigate(`/works/${workIndex + 2}`)}>
                下一個 →
              </button>
            )}
          </div>
        </div>

        <section className="work-detail-hero">
          <div className="work-detail-hero-image-wrap">
            <img src={coverImage} alt={workData.title} className="work-detail-hero-image" />
          </div>

          <div className="work-detail-hero-content">
            <h1 className="work-detail-title">{formattedTitle}</h1>
            <p className="work-detail-intro">{workData.intro}</p>
          </div>
        </section>

        <section className="work-detail-sections">
          {workData.sections.map((section, sectionIndex) => (
            <article key={section.title} className="work-detail-section">
              <div className={`work-detail-section-grid ${sectionIndex % 2 === 1 ? 'is-reverse' : ''}`}>
                <div className="work-detail-section-content">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ol>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ol>
                  )}
                </div>

                {section.image && (
                  <div className="work-detail-section-image-wrap">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="work-detail-section-image"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>

        {workData.slideshowImages && workData.slideshowImages.length > 0 && (
          <section className="work-detail-slider">
            <h2>更多相片</h2>
            <Slider images={workData.slideshowImages} altPrefix={`${workData.title} 相片`} showDots={false} fit="contain" />
          </section>
        )}

      </div>
    </div>
  )
}
