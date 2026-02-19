import { useState } from 'react'

function StoreSettings({ storeName, setStoreName, themeColor, setThemeColor, onBack }) {
    const [name, setName] = useState(storeName)
    const [color, setColor] = useState(themeColor)

    const handleSave = (e) => {
        e.preventDefault()
        setStoreName(name)
        setThemeColor(color)
        alert('Cập nhật cài đặt thành công!')
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
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <label>Màu sắc chủ đạo giao diện</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <input
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                style={{ width: '60px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            />
                            <span>{color.toUpperCase()}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Chọn màu sắc yêu thích để thay đổi toàn bộ giao diện ứng dụng.</p>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '30px' }}>
                        Lưu Thay Đổi
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StoreSettings
