import { useState } from 'react'

function Expenses({ expenses, setExpenses, onBack }) {
    const [showAdd, setShowAdd] = useState(false)
    const [newExp, setNewExp] = useState({ title: '', amount: '', type: 'Chi', category: 'Chi phí' })

    const totalIncome = expenses.filter(e => e.type === 'Thu').reduce((sum, e) => sum + Number(e.amount), 0)
    const totalExpense = expenses.filter(e => e.type === 'Chi').reduce((sum, e) => sum + Number(e.amount), 0)
    const balance = totalIncome - totalExpense

    const handleAdd = (e) => {
        e.preventDefault()
        setExpenses([{ ...newExp, id: Date.now(), date: new Date().toLocaleDateString('vi-VN') }, ...expenses])
        setShowAdd(false)
        setNewExp({ title: '', amount: '', type: 'Chi', category: 'Chi phí' })
    }

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Quản Lý Thu Chi</h2>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Ghi chép mới</button>
            </div>

            <div className="stats-grid mb-3">
                <div className="stat-card revenue">
                    <div className="stat-label">Tổng Thu</div>
                    <div className="stat-value">{totalIncome.toLocaleString('vi-VN')}đ</div>
                </div>
                <div className="stat-card debt">
                    <div className="stat-label">Tổng Chi</div>
                    <div className="stat-value">{totalExpense.toLocaleString('vi-VN')}đ</div>
                </div>
                <div className="stat-card profit">
                    <div className="stat-label">Cân Đối (Lý thuyết)</div>
                    <div className="stat-value" style={{ borderTop: '2px solid #ddd', paddingTop: '5px' }}>
                        {balance.toLocaleString('vi-VN')}đ
                    </div>
                </div>
            </div>

            {showAdd && (
                <div className="card mb-3">
                    <h3>Ghi chép giao dịch mới</h3>
                    <form onSubmit={handleAdd}>
                        <div className="grid grid-2 gap-2 mt-2">
                            <div className="form-group">
                                <label>Nội dung</label>
                                <input
                                    className="form-input"
                                    value={newExp.title}
                                    onChange={e => setNewExp({ ...newExp, title: e.target.value })}
                                    placeholder="Vd: Thanh toán tiền rác"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Số tiền</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={newExp.amount}
                                    onChange={e => setNewExp({ ...newExp, amount: e.target.value })}
                                    placeholder="Nhập số tiền"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Loại</label>
                                <select
                                    className="form-input"
                                    value={newExp.type}
                                    onChange={e => setNewExp({ ...newExp, type: e.target.value })}
                                >
                                    <option value="Thu">Thu tiền (+)</option>
                                    <option value="Chi">Chi tiền (-)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Danh mục</label>
                                <input
                                    className="form-input"
                                    value={newExp.category}
                                    onChange={e => setNewExp({ ...newExp, category: e.target.value })}
                                    placeholder="Vd: Vận hành, Lương, Khác"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button type="submit" className="btn btn-primary">Lưu giao dịch</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)}>Hủy</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <h3>Lịch sử giao dịch</h3>
                <div className="stock-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Nội dung</th>
                                <th>Danh mục</th>
                                <th>Số tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(exp => (
                                <tr key={exp.id}>
                                    <td>{exp.date}</td>
                                    <td><strong>{exp.title}</strong></td>
                                    <td><span className="badge badge-secondary">{exp.category}</span></td>
                                    <td className={exp.type === 'Thu' ? 'text-success font-bold' : 'text-danger font-bold'}>
                                        {exp.type === 'Thu' ? '+' : '-'}{Number(exp.amount).toLocaleString('vi-VN')}đ
                                    </td>
                                    <td>
                                        <button className="btn-icon" onClick={() => setExpenses(expenses.filter(i => i.id !== exp.id))}>🗑️</button>
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

export default Expenses
