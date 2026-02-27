import { useState } from 'react'

function Suppliers({ suppliers, setSuppliers, onBack }) {
    const [showAdd, setShowAdd] = useState(false)
    const [newS, setNewS] = useState({ name: '', phone: '', address: '' })

    const handleAdd = () => {
        setSuppliers([...suppliers, { ...newS, id: Date.now() }])
        setShowAdd(false)
        setNewS({ name: '', phone: '', address: '' })
    }

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Nhà Cung Cấp</h2>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Thêm NCC</button>
            </div>

            {showAdd && (
                <div className="card mb-3">
                    <h3>Thêm Nhà Cung Cấp Mới</h3>
                    <div className="grid grid-3 gap-2 mt-2">
                        <input placeholder="Tên NCC" className="form-input" value={newS.name} onChange={e => setNewS({ ...newS, name: e.target.value })} />
                        <input placeholder="Số điện thoại" className="form-input" value={newS.phone} onChange={e => setNewS({ ...newS, phone: e.target.value })} />
                        <input placeholder="Địa chỉ" className="form-input" value={newS.address} onChange={e => setNewS({ ...newS, address: e.target.value })} />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button className="btn btn-primary" onClick={handleAdd}>Lưu</button>
                        <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Hủy</button>
                    </div>
                </div>
            )}

            <div className="grid grid-3">
                {suppliers.map(s => (
                    <div key={s.id} className="card">
                        <h4>{s.name}</h4>
                        <p>📞 {s.phone}</p>
                        <p>📍 {s.address}</p>
                        <button className="btn btn-danger btn-sm mt-1" onClick={() => setSuppliers(suppliers.filter(i => i.id !== s.id))}>Xóa</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Suppliers
