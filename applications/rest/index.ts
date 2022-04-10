import express, { Application, Request, Response } from 'express'

import routes from './src/routes'

const app: Application = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the coffe manager API! 
        \n Endpoints available at http://localhost:${PORT}/api/v1` })
})

app.use('/api/v1', routes)

try {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
} catch (error) {
    console.log(`Error occurred: ${error}`)
}