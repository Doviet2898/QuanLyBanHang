import { useState } from 'react'

function Categories({ categories, setCategories, onBack }) {
    const [newCat, setNewCat] = useState('')

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Danh Mục Sản Phẩm</h2>
            </div>

            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <div className="flex gap-2 mb-3">
                    <input
                        placeholder="Tên danh mục mới"
                        className="form-input"
                        value={newCat}
                        onChange={e => setNewCat(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={() => {
                        if (newCat) {
                            setCategories([...categories, newCat])
                            setNewCat('')
                        }
                    }}>Thêm</button>
                </div>

                <div className="list">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex flex-between p-1 border-bottom">
                            <span>{cat}</span>
                            <button className="btn-icon" onClick={() => setCategories(categories.filter(c => c !== cat))}>🗑️</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories
