function StatsCards({ orders, products }) {
    const completedOrders = orders?.filter(order => order.status === 'Hoàn thành') || []
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0)

    // Giả sử lợi nhuận là 60% doanh thu
    const profit = totalRevenue * 0.6

    const processingOrders = orders?.filter(order => order.status === 'Đang xử lý') || []

    const stats = [
        {
            id: 'revenue',
            label: 'Doanh thu',
            value: totalRevenue.toLocaleString('vi-VN'),
            icon: '💰',
            type: 'revenue'
        },
        {
            id: 'profit',
            label: 'Lợi nhuận',
            value: profit.toFixed(0).toLocaleString('vi-VN'),
            icon: '💡',
            type: 'profit'
        },
        {
            id: 'orders',
            label: 'Đơn hàng',
            value: orders?.length || 0,
            icon: '📦',
            type: 'debt'
        }
    ]

    return (
        <section className="stats-section">
            <div className="stats-grid">
                {stats.map(stat => (
                    <div key={stat.id} className={`stat-card ${stat.type}`}>
                        <div className="stat-header">
                            <div className="stat-icon">{stat.icon}</div>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default StatsCards
