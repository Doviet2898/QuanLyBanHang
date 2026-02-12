import { useState } from 'react'

function StoreSettings({ storeName, setStoreName, onBack }) {
    const [name, setName] = useState(storeName)

    const handleSave = (e) => {
        e.preventDefault()
        setStoreName(name)
        alert('Cập nhật tên cửa hàng thành công!')
        onBack()
    }

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Cài đặt Cửa hàng</h2>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label>Tên cửa hàng</label>
                        <input
                            type="text"
                            className="form-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                        Lưu Thay Đổi
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StoreSettings
