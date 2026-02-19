import { useState } from 'react'

function Reminders({ reminders, setReminders, onBack }) {
    const [showAdd, setShowAdd] = useState(false)
    const [newR, setNewR] = useState({ title: '', time: '', date: '' })

    const handleAdd = () => {
        setReminders([...reminders, { ...newR, id: Date.now() }])
        setShowAdd(false)
        setNewR({ title: '', time: '', date: '' })
    }

    return (
        <div className="container">
            <div className="page-header">
                <button className="btn-back" onClick={onBack}>← Quay lại</button>
                <h2>Lịch Nhắc Việc</h2>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Thêm Lịch</button>
            </div>

            {showAdd && (
                <div className="card mb-3">
                    <h3>Tạo Nhắc Việc</h3>
                    <div className="grid grid-3 gap-2 mt-2">
                        <input placeholder="Nội dung nhắc" className="form-input" value={newR.title} onChange={e => setNewR({ ...newR, title: e.target.value })} />
                        <input type="date" className="form-input" value={newR.date} onChange={e => setNewR({ ...newR, date: e.target.value })} />
                        <input type="time" className="form-input" value={newR.time} onChange={e => setNewR({ ...newR, time: e.target.value })} />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleAdd}>Lưu</button>
                </div>
            )}

            <div className="grid grid-4">
                {reminders.map(r => (
                    <div key={r.id} className="card" style={{ borderLeft: '5px solid orange' }}>
                        <div className="font-bold">{r.title}</div>
                        <div style={{ color: '#666', fontSize: '14px' }}>⏰ {r.time} - 📅 {r.date}</div>
                        <button className="btn-icon mt-1" onClick={() => setReminders(reminders.filter(i => i.id !== r.id))}>🗑️</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reminders
