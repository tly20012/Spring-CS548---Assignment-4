const axios = require('axios')
const { GITHUB_TOKEN } = process.env

// Get GitHub settings
const getSettings = async () => {

    const settingsUrl = 'https://api.github.com/repos/tly20012/APIs/contents/github_settings.json'

    const settings = await axios.get(
        settingsUrl,
        {
            headers: {
                'Accept': 'application/vnd.github.raw+json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return settings
}

module.exports = { getSettings }