import { useState } from 'react'

function Promotions({ promotions, setPromotions, onBack }) {
    const [showAdd, setShowAdd] = useState(false)
    const [newP, setNewP] = useState({ code: '', discount: '', type: 'percent' })

    const handleAdd = () => {
        setPromotions([...promotions, { ...newP, id: Date.now() }])
        setShowAdd(false)
        setNewP({ code: '', discount: '', type: 'percent' })
    }

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Chương Trình Khuyến Mại</h2>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Tạo Mã</button>
            </div>

            {showAdd && (
                <div className="card mb-3">
                    <h3>Thêm Mã Khuyến Mại</h3>
                    <div className="grid grid-3 gap-2 mt-2">
                        <input placeholder="Mã (Vd: KM2024)" className="form-input" value={newP.code} onChange={e => setNewP({ ...newP, code: e.target.value.toUpperCase() })} />
                        <input type="number" placeholder="Giá trị" className="form-input" value={newP.discount} onChange={e => setNewP({ ...newP, discount: e.target.value })} />
                        <select className="form-input" value={newP.type} onChange={e => setNewP({ ...newP, type: e.target.value })}>
                            <option value="percent">% Giảm giá</option>
                            <option value="fixed">Số tiền mặt</option>
                        </select>
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleAdd}>Lưu Mã</button>
                </div>
            )}

            <div className="grid grid-3">
                {promotions.map(p => (
                    <div key={p.id} className="card" style={{ borderBottom: '3px solid red' }}>
                        <div className="font-bold text-danger" style={{ fontSize: '20px' }}>{p.code}</div>
                        <div className="mt-1">Giảm: {p.discount}{p.type === 'percent' ? '%' : 'đ'}</div>
                        <button className="btn btn-secondary btn-sm mt-1" onClick={() => setPromotions(promotions.filter(i => i.id !== p.id))}>Gỡ bỏ</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Promotions
