function PendingOrders({ orders, onClick }) {
    const pendingCount = orders?.filter(order => order.status === 'Đang xử lý').length || 0

    return (
        <section className="pending-section">
            <div className="pending-card" onClick={onClick}>
                <div className="pending-content">
                    <div className="pending-left">
                        <div className="pending-icon">📋</div>
                        <div className="pending-text">
                            <span className="pending-count">{pendingCount}</span>
                            <span className="pending-label">đơn hàng chờ xử lý</span>
                        </div>
                    </div>
                    <div className="pending-arrow">›</div>
                </div>
            </div>
        </section>
    )
}

export default PendingOrders
