import { useState } from 'react'
import '../styles/Warehouse.css'

function Warehouse({ products, onUpdateProduct, onBack }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [adjustmentType, setAdjustmentType] = useState('import') // import or export
    const [quantity, setQuantity] = useState('')
    const [note, setNote] = useState('')

    const handleAdjustStock = (e) => {
        e.preventDefault()

        if (!selectedProduct || !quantity) {
            alert('Vui lòng chọn sản phẩm và nhập số lượng!')
            return
        }

        const adjustmentQty = parseInt(quantity)
        const newStock = adjustmentType === 'import'
            ? selectedProduct.stock + adjustmentQty
            : selectedProduct.stock - adjustmentQty

        if (newStock < 0) {
            alert('Số lượng xuất kho không được lớn hơn tồn kho hiện tại!')
            return
        }

        onUpdateProduct(selectedProduct.id, { stock: newStock })

        alert(`${adjustmentType === 'import' ? 'Nhập' : 'Xuất'} kho thành công!`)

        // Reset form
        setSelectedProduct(null)
        setQuantity('')
        setNote('')
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const lowStockProducts = products.filter(product => product.stock < 20)

    return (
        <div className="warehouse-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Quản Lý Kho Hàng</h2>
                </div>

                {lowStockProducts.length > 0 && (
                    <div className="alert alert-warning">
                        <strong>⚠️ Cảnh báo:</strong> Có {lowStockProducts.length} sản phẩm sắp hết hàng!
                        <ul>
                            {lowStockProducts.map(product => (
                                <li key={product.id}>{product.name}: {product.stock} sản phẩm</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="warehouse-content">
                    <div className="stock-adjustment">
                        <h3>Nhập/Xuất Kho</h3>
                        <form onSubmit={handleAdjustStock}>
                            <div className="form-group">
                                <label>Loại giao dịch</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="import"
                                            checked={adjustmentType === 'import'}
                                            onChange={(e) => setAdjustmentType(e.target.value)}
                                        />
                                        <span>📥 Nhập kho</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            value="export"
                                            checked={adjustmentType === 'export'}
                                            onChange={(e) => setAdjustmentType(e.target.value)}
                                        />
                                        <span>📤 Xuất kho</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tìm kiếm sản phẩm</label>
                                <input
                                    type="text"
                                    placeholder="🔍 Nhập tên sản phẩm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Chọn sản phẩm *</label>
                                <div className="product-select-list">
                                    {filteredProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className={`product-select-item ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <div className="product-select-info">
                                                <strong>{product.name}</strong>
                                                <span className="product-select-stock">
                                                    Tồn kho: {product.stock}
                                                </span>
                                            </div>
                                            {selectedProduct?.id === product.id && <span className="check-icon">✓</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedProduct && (
                                <>
                                    <div className="form-group">
                                        <label>Số lượng *</label>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            min="1"
                                            required
                                            className="form-input"
                                            placeholder="Nhập số lượng"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Ghi chú</label>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            className="form-input"
                                            placeholder="Nhập ghi chú (tùy chọn)"
                                            rows="3"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-submit">
                                        {adjustmentType === 'import' ? '📥 Nhập Kho' : '📤 Xuất Kho'}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    <div className="stock-overview">
                        <h3>Tổng Quan Kho Hàng</h3>
                        <div className="stock-stats">
                            <div className="stat-box">
                                <div className="stat-icon">📦</div>
                                <div className="stat-info">
                                    <div className="stat-value">{products.length}</div>
                                    <div className="stat-label">Tổng sản phẩm</div>
                                </div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-icon">📊</div>
                                <div className="stat-info">
                                    <div className="stat-value">
                                        {products.reduce((sum, p) => sum + p.stock, 0)}
                                    </div>
                                    <div className="stat-label">Tổng tồn kho</div>
                                </div>
                            </div>
                            <div className="stat-box warning">
                                <div className="stat-icon">⚠️</div>
                                <div className="stat-info">
                                    <div className="stat-value">{lowStockProducts.length}</div>
                                    <div className="stat-label">Sắp hết hàng</div>
                                </div>
                            </div>
                        </div>

                        <div className="stock-table">
                            <h4>Danh Sách Tồn Kho</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Danh mục</th>
                                        <th>Tồn kho</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.stock}</td>
                                            <td>
                                                {product.stock < 10 ? (
                                                    <span className="badge badge-danger">Rất thấp</span>
                                                ) : product.stock < 20 ? (
                                                    <span className="badge badge-warning">Thấp</span>
                                                ) : (
                                                    <span className="badge badge-success">Đủ hàng</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Warehouse
