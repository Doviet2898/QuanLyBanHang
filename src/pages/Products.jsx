import { useState } from 'react'
import '../styles/Products.css'

function Products({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onBack }) {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const productData = {
            name: formData.name,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            category: formData.category
        }

        if (editingProduct) {
            onUpdateProduct(editingProduct.id, productData)
            setEditingProduct(null)
        } else {
            onAddProduct(productData)
        }

        setFormData({ name: '', price: '', stock: '', category: '' })
        setShowAddForm(false)
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            price: product.price.toString(),
            stock: product.stock.toString(),
            category: product.category
        })
        setShowAddForm(true)
    }

    const handleCancel = () => {
        setShowAddForm(false)
        setEditingProduct(null)
        setFormData({ name: '', price: '', stock: '', category: '' })
    }

    const handleDelete = (productId, productName) => {
        if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${productName}"?`)) {
            onDeleteProduct(productId)
        }
    }

    return (
        <div className="products-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Quản Lý Sản Phẩm</h2>
                    <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                        + Thêm Sản Phẩm
                    </button>
                </div>

                {showAddForm && (
                    <div className="modal-overlay" onClick={handleCancel}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>{editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Tên sản phẩm *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        placeholder="Nhập tên sản phẩm"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Giá bán *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="form-input"
                                        placeholder="Nhập giá bán"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Số lượng tồn kho *</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="form-input"
                                        placeholder="Nhập số lượng"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Danh mục *</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        placeholder="Nhập danh mục"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingProduct ? 'Cập Nhật' : 'Thêm Mới'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="products-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá bán</th>
                                <th>Tồn kho</th>
                                <th>Danh mục</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>#{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price.toLocaleString('vi-VN')}đ</td>
                                    <td>
                                        <span className={product.stock < 20 ? 'stock-low' : 'stock-ok'}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td>{product.category}</td>
                                    <td className="action-buttons">
                                        <button
                                            className="btn-icon btn-edit"
                                            onClick={() => handleEdit(product)}
                                            title="Chỉnh sửa"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn-icon btn-delete"
                                            onClick={() => handleDelete(product.id, product.name)}
                                            title="Xóa"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Products
