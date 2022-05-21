export default function handler(req, res) {
    const body = req.body
    console.log('body: ', body)
    if (!body.title || !body.body) {
        return res.status(400).json({data: 'Data not found'})
    }
    res.status(200).json({data: `${body.title} ${body.body}`})
}