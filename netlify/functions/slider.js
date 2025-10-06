// Netlify Function: slider
// Reads/writes a JSON array at a path in your GitHub repo via the Contents API

const OWNER = process.env.GITHUB_OWNER
const REPO = process.env.GITHUB_REPO
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const FILE_PATH = process.env.CMS_FILE_PATH || 'content/slider.json'
const TOKEN = process.env.GITHUB_TOKEN

const GITHUB_API = 'https://api.github.com'

const okEnv = () => OWNER && REPO && TOKEN

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: cors, body: '' }
    }

    if (!okEnv()) {
        return {
            statusCode: 500,
            headers: cors,
            body: JSON.stringify({ error: 'Missing env: GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN' })
        }
    }

    try {
        if (event.httpMethod === 'GET') {
            const data = await getFile()
            const content = Buffer.from(data.content, 'base64').toString('utf8')
            const json = JSON.parse(content || '[]')
            return { statusCode: 200, headers: { 'Content-Type': 'application/json', ...cors }, body: JSON.stringify(json) }
        }

        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '[]')
            if (!Array.isArray(body) || !body.every((v) => typeof v === 'string')) {
                return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'Body must be string[]' }) }
            }
            const existing = await getFile().catch(() => null)
            const sha = existing && existing.sha
            const content = Buffer.from(JSON.stringify(body, null, 2), 'utf8').toString('base64')
            const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(FILE_PATH)}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/vnd.github+json'
                },
                body: JSON.stringify({
                    message: `chore(cms): update ${FILE_PATH}`,
                    content,
                    sha,
                    branch: BRANCH
                })
            })
            if (!res.ok) {
                const text = await res.text()
                return { statusCode: res.status, headers: cors, body: JSON.stringify({ error: 'GitHub update failed', details: text }) }
            }
            return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true }) }
        }

        return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method Not Allowed' }) }
    } catch (e) {
        return { statusCode: 500, headers: cors, body: JSON.stringify({ error: String(e) }) }
    }
}

async function getFile() {
    const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(FILE_PATH)}?ref=${encodeURIComponent(BRANCH)}`
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: 'application/vnd.github+json'
        }
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(`GitHub get failed: ${res.status} ${text}`)
    }
    return res.json()
}


