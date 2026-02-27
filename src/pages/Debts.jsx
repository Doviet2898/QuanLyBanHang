function Debts({ debts, onPayDebt, onBack }) {
    const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0)

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Sổ Nợ Khách Hàng</h2>
            </div>

            <div className="stats-grid mb-3">
                <div className="stat-card debt">
                    <div className="stat-header">
                        <div className="stat-icon">📓</div>
                        <span className="stat-label">Tổng nợ chưa trả</span>
                    </div>
                    <div className="stat-value">{totalDebt.toLocaleString('vi-VN')}đ</div>
                </div>
            </div>

            <div className="card">
                {debts.length === 0 ? (
                    <p className="text-center">Tuyệt vời! Không có ai nợ bạn.</p>
                ) : (
                    <div className="stock-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Khách hàng</th>
                                    <th>Số tiền</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {debts.map(debt => (
                                    <tr key={debt.id}>
                                        <td>{debt.date}</td>
                                        <td>
                                            <strong>{debt.customerName}</strong>
                                            <div style={{ fontSize: '12px', color: '#666' }}>{debt.phone}</div>
                                        </td>
                                        <td className="text-danger font-bold">{debt.amount.toLocaleString('vi-VN')}đ</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    if (window.confirm('Xác nhận khách đã trả nợ?')) onPayDebt(debt.id)
                                                }}
                                            >
                                                Đã trả
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Debts
