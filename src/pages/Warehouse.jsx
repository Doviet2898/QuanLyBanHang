import { useState } from 'react'
import '../styles/Warehouse.css'

function Warehouse({ products, onUpdateProduct, stockHistory, onBack }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [adjustmentType, setAdjustmentType] = useState('import') // import, export, balance
    const [quantity, setQuantity] = useState('')
    const [note, setNote] = useState('')
    const [viewTab, setViewTab] = useState('overview') // overview or history

    const handleAdjustStock = (e) => {
        e.preventDefault()

        if (!selectedProduct || !quantity) {
            alert('Vui lòng chọn sản phẩm và nhập số lượng!')
            return
        }

        const val = parseInt(quantity)
        let newStock = selectedProduct.stock

        if (adjustmentType === 'import') {
            newStock += val
        } else if (adjustmentType === 'export') {
            newStock -= val
        } else if (adjustmentType === 'balance') {
            newStock = val
        }

        if (newStock < 0) {
            alert('Tồn kho không được nhỏ hơn 0!')
            return
        }

        onUpdateProduct(selectedProduct.id, {
            stock: newStock,
            note: adjustmentType === 'balance' ? `[Kiểm kê/Cân đối] ${note}` : note
        })

        alert('Cập nhật thành công!')

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
                    <div className="tab-group">
                        <button className={`tab-btn ${viewTab === 'overview' ? 'active' : ''}`} onClick={() => setViewTab('overview')}>📊 Tổng Quan</button>
                        <button className={`tab-btn ${viewTab === 'history' ? 'active' : ''}`} onClick={() => setViewTab('history')}>📜 Lịch Sử Giao Dịch</button>
                    </div>
                </div>

                {viewTab === 'overview' ? (
                    <>
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
                                                <span>📤 Xuất</span>
                                            </label>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    value="balance"
                                                    checked={adjustmentType === 'balance'}
                                                    onChange={(e) => setAdjustmentType(e.target.value)}
                                                />
                                                <span>⚖️ Cân đối</span>
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
                                                        <span className="product-select-stock">Tồn kho: {product.stock}</span>
                                                    </div>
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
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Ghi chú</label>
                                                <textarea
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                    className="form-input"
                                                    rows="3"
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-submit">Xác nhận giao dịch</button>
                                        </>
                                    )}
                                </form>
                            </div>

                            <div className="stock-overview">
                                <h3>Danh sách hàng tồn</h3>
                                <div className="stock-table">
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
                                                    <td className={product.stock < 20 ? 'stock-low' : 'stock-ok'}>{product.stock}</td>
                                                    <td>
                                                        {product.stock < 10 ? <span className="badge badge-danger">Rất thấp</span>
                                                            : product.stock < 20 ? <span className="badge badge-warning">Thấp</span>
                                                                : <span className="badge badge-success">Đủ hàng</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="history-section">
                        <div className="stock-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ngày</th>
                                        <th>Sản phẩm</th>
                                        <th>Loại</th>
                                        <th>Số lượng</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockHistory.map(log => (
                                        <tr key={log.id}>
                                            <td>{log.date}</td>
                                            <td><strong>{log.productName}</strong></td>
                                            <td>
                                                <span className={`badge ${log.type.includes('Nhập') ? 'badge-success' : 'badge-danger'}`}>
                                                    {log.type}
                                                </span>
                                            </td>
                                            <td>{log.quantity}</td>
                                            <td>{log.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Warehouse
