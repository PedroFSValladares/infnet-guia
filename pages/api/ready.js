export default function handler(req, res) {
    // Como não há dependências, sempre pronto
    res.status(200).json({ status: 'ready' });
}  