// Netlify Function: uploadImage
// Accepts JSON { filename, contentType, dataBase64 } and commits it to GitHub under CMS_IMAGE_DIR.
// Returns { url } where url is a jsDelivr CDN URL to the committed file.

const OWNER = process.env.GITHUB_OWNER
const REPO = process.env.GITHUB_REPO
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const TOKEN = process.env.GITHUB_TOKEN
const CMS_IMAGE_DIR = process.env.CMS_IMAGE_DIR || 'content/slider'

const GITHUB_API = 'https://api.github.com'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' }
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }
  if (!OWNER || !REPO || !TOKEN) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: 'Missing env: GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN' }) }
  }
  try {
    const body = JSON.parse(event.body || '{}')
    const { filename, contentType, dataBase64 } = body
    if (!filename || !dataBase64) {
      return { statusCode: 400, headers: cors, body: JSON.stringify({ error: 'filename and dataBase64 required' }) }
    }
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const ts = Date.now()
    const path = `${CMS_IMAGE_DIR}/${ts}_${safeName}`
    const url = `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json'
      },
      body: JSON.stringify({
        message: `chore(cms): add image ${path}`,
        content: dataBase64,
        branch: BRANCH
      })
    })
    if (!res.ok) {
      const text = await res.text()
      return { statusCode: res.status, headers: cors, body: JSON.stringify({ error: 'GitHub upload failed', details: text }) }
    }
    const cdnUrl = `https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@${BRANCH}/${path}`
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', ...cors }, body: JSON.stringify({ url: cdnUrl }) }
  } catch (e) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: String(e) }) }
  }
}


