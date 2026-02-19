import { useState } from 'react'
import '../styles/Staff.css'

function Staff({ staff, onAddStaff, onUpdateStaff, onDeleteStaff, onBack }) {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingStaff, setEditingStaff] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        phone: '',
        salary: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const staffData = {
            name: formData.name,
            position: formData.position,
            phone: formData.phone,
            salary: parseFloat(formData.salary)
        }

        if (editingStaff) {
            onUpdateStaff(editingStaff.id, staffData)
            setEditingStaff(null)
        } else {
            onAddStaff(staffData)
        }

        setFormData({ name: '', position: '', phone: '', salary: '' })
        setShowAddForm(false)
    }

    const handleEdit = (staffMember) => {
        setEditingStaff(staffMember)
        setFormData({
            name: staffMember.name,
            position: staffMember.position,
            phone: staffMember.phone,
            salary: staffMember.salary.toString()
        })
        setShowAddForm(true)
    }

    const handleCancel = () => {
        setShowAddForm(false)
        setEditingStaff(null)
        setFormData({ name: '', position: '', phone: '', salary: '' })
    }

    const handleDelete = (staffId, staffName) => {
        if (window.confirm(`Bạn có chắc muốn xóa nhân viên "${staffName}"?`)) {
            onDeleteStaff(staffId)
        }
    }

    const totalSalary = staff.reduce((sum, member) => sum + member.salary, 0)

    return (
        <div className="staff-page">
            <div className="container">
                <div className="page-header">
                    <button className="btn-back" onClick={onBack}>← Quay lại</button>
                    <h2>Quản Lý Nhân Viên</h2>
                    <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
                        + Thêm Nhân Viên
                    </button>
                </div>

                <div className="staff-stats">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <div className="stat-value">{staff.length}</div>
                            <div className="stat-label">Tổng nhân viên</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-info">
                            <div className="stat-value">{totalSalary.toLocaleString('vi-VN')}đ</div>
                            <div className="stat-label">Tổng lương/tháng</div>
                        </div>
                    </div>
                </div>

                {showAddForm && (
                    <div className="modal-overlay" onClick={handleCancel}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>{editingStaff ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên Mới'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Họ và tên *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        placeholder="Nhập họ và tên"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Chức vụ *</label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        placeholder="Nhập chức vụ"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="form-input"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Lương (VNĐ) *</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="form-input"
                                        placeholder="Nhập mức lương"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                        Hủy
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingStaff ? 'Cập Nhật' : 'Thêm Mới'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="staff-grid">
                    {staff.map(member => (
                        <div key={member.id} className="staff-card">
                            <div className="staff-avatar">👤</div>
                            <div className="staff-info">
                                <h3>{member.name}</h3>
                                <p className="staff-position">{member.position}</p>
                                <p className="staff-phone">📞 {member.phone}</p>
                                <p className="staff-salary">💰 {member.salary.toLocaleString('vi-VN')}đ/tháng</p>
                            </div>
                            <div className="staff-actions">
                                <button
                                    className="btn-icon btn-edit"
                                    onClick={() => handleEdit(member)}
                                    title="Chỉnh sửa"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn-icon btn-delete"
                                    onClick={() => handleDelete(member.id, member.name)}
                                    title="Xóa"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Staff
