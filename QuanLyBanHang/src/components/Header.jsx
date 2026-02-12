function Header({ currentView, onNavigate }) {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="header-left">
                        <div className="store-icon" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
                            🏪
                        </div>
                        <div className="store-info">
                            <h1 onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
                                Cafe Đỗ Việt
                            </h1>
                            <div className="store-status">
                                <span>▶</span>
                                <span>Thiết lập vận hành</span>
                            </div>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn" title="Lịch">📅</button>
                        <button className="icon-btn" title="Thông báo">🔔</button>
                        {currentView !== 'dashboard' && (
                            <button
                                className="icon-btn"
                                title="Về trang chủ"
                                onClick={() => onNavigate('dashboard')}
                            >
                                🏠
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
