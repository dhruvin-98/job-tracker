import { useState } from 'react';

function EditModal({ job, onClose, onSave }) {
  const [form, setForm] = useState({
    company: job.company,
    role: job.role,
    status: job.status,
    notes: job.notes || '',
    deadlinwe: job.deadline ? job.deadline.split('T')[0] : '' // Format date for input
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(job._id, form);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3>Edit Job</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Company</label>
          <input
            style={styles.input}
            name="company"
            value={form.company}
            onChange={handleChange}
            required
          />
          <label style={styles.label}>Role</label>
          <input
            style={styles.input}
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          />
          <label style={styles.label}>Status</label>
          <select
            style={styles.input}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <label style={styles.label}>Notes</label>
          <textarea
            style={{ ...styles.input, height: '80px', resize: 'vertical' }}
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
          <label style={styles.label}>Follow-up Deadline (optional)</label>
            <input
              style={styles.input}
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          <div style={styles.btnRow}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff', borderRadius: '10px',
    padding: '28px', width: '100%', maxWidth: '460px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '20px'
  },
  closeBtn: {
    background: 'none', border: 'none',
    fontSize: '18px', cursor: 'pointer', color: '#666'
  },
  label: { display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' },
  input: {
    width: '100%', padding: '10px', marginBottom: '14px',
    borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px'
  },
  btnRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' },
  cancelBtn: {
    padding: '10px 20px', borderRadius: '6px',
    border: '1px solid #ddd', cursor: 'pointer',
    backgroundColor: '#fff', fontSize: '14px'
  },
  saveBtn: {
    padding: '10px 20px', borderRadius: '6px', border: 'none',
    backgroundColor: '#4f46e5', color: '#fff',
    cursor: 'pointer', fontSize: '14px'
  }
};

export default EditModal;