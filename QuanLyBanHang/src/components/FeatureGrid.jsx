function FeatureGrid({ onFeatureClick }) {
    const features = [
        { id: 'create-order', name: 'Tạo đơn', icon: '📝' },
        { id: 'orders', name: 'Đơn hàng', icon: '📦' },
        { id: 'products', name: 'Sản phẩm', icon: '🛍️' },
        { id: 'promotions', name: 'Khuyến mại', icon: '🎁' },
        { id: 'warehouse', name: 'Kho hàng', icon: '🏪' },
        { id: 'reports', name: 'Báo cáo', icon: '📊' },
        { id: 'staff', name: 'Nhân viên', icon: '👥' },
        { id: 'suppliers', name: 'Nhà cung cấp', icon: '🤝' },
        { id: 'notebook', name: 'Sổ nợ', icon: '📓' },
        { id: 'import-orders', name: 'Nhập hàng', icon: '🛒' },
        { id: 'expenses', name: 'Thu chi', icon: '💸' },
        { id: 'calendar', name: 'Lịch nhắc', icon: '📅' },
        { id: 'categories', name: 'Danh mục', icon: '📂' },
        { id: 'store-settings', name: 'Cửa hàng', icon: '⚙️' },
    ]

    return (
        <section className="features-section">
            <div className="features-grid">
                {features.map(feature => (
                    <div
                        key={feature.id}
                        className="feature-card"
                        onClick={() => onFeatureClick(feature.id)}
                    >
                        <div className="feature-icon">{feature.icon}</div>
                        <span className="feature-name">{feature.name}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeatureGrid
