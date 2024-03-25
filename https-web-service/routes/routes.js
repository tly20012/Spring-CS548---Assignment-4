const express = require('express')
const router = express.Router()

const logger = require('../logger')
const { getSettings } = require('../controllers/getSettings')

// Get client's device type & IP address
router.use((req, res, next) => {
    req.userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    req.deviceType = req.header('User-Agent')
    next()
})

// Route to fetch GitHub settings
router.get('/github-settings', async (req, res) => {
    try {
        const response = await getSettings()
        logger.info('GitHub settings fetched successfully')
        res.json({ data: response.data, userIp: req.userIp, deviceType: req.deviceType })
    } catch (error) {
        logger.error('Error fetching GitHub settings:', error)
        res.status(500).json({ error: 'Internal server error', userIp: req.userIp, deviceType: req.deviceType })
    }
});

// Route to handle POST requests
router.post('/store-check', async (req, res) => {
    try {
        // Extract data from request body
        const requestData = req.body

        // Check if storeCheck exists in the request body
        if (!requestData.hasOwnProperty('storeCheck')) {
            return res.status(400).json({ error: 'storeCheck property is missing in the request body', userIp: req.userIp, deviceType: req.deviceType })
        }

        // Fetch GitHub settings
        const response = await getSettings()

        let minimalResponse = {}

        if (requestData.storeCheck) {
            // Filter the response to send minimal data
            minimalResponse = {
                operatingStatus: response.data.ecomStore.operatingStatus,
                isPremiumStore: response.data.ecomStore.isPremiumStore,
                isDeliveryStore: response.data.ecomStore.isDeliveryStore
            }
        } else {
            minimalResponse = {
                timezone: response.data.timezone
            }
        }

        logger.info('GitHub settings fetched successfully')
        res.json({ minimalResponse, userIp: req.userIp, deviceType: req.deviceType }) // Send minimal response
    } catch (error) {
        logger.error('Error processing data:', error)
        res.status(500).send('Internal server error')
    }
});

module.exports = router;