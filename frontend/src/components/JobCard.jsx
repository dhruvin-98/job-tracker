const statusColors = {
  Applied: '#3b82f6',
  Interview: '#f59e0b',
  Offer: '#10b981',
  Rejected: '#ef4444'
};

function JobCard({ job, onDelete, onStatusUpdate ,onEdit}) {
  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div>
          <h3 style={styles.company}>{job.company}</h3>
          <p style={styles.role}>{job.role}</p>
        </div>
        <span style={{ ...styles.badge, backgroundColor: statusColors[job.status] }}>
          {job.status}
        </span>
      </div>

      {job.notes && <p style={styles.notes}>{job.notes}</p>}

      <p style={styles.date}>Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>

{job.deadline && (
  <p style={{
    ...styles.date,
    color: new Date(job.deadline) < new Date() ? '#ef4444' : '#f59e0b',
    fontWeight: 'bold'
  }}>
    Follow-up by: {new Date(job.deadline).toLocaleDateString()}
  </p>
)}
{job.source && (
  <p style={styles.date}>
    Via: {job.sourceLink
      ? <a href={job.sourceLink} target="_blank" rel="noreferrer" style={{ color: '#4f46e5' }}>{job.source}</a>
      : job.source
    }
  </p>
)}
      <div style={styles.actions}>
        <select
          style={styles.select}
          value={job.status}
          onChange={(e) => onStatusUpdate(job._id, e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button style={styles.editBtn} onClick={() => onEdit(job._id)}>
          Edit
        </button>
        <button style={styles.deleteBtn} onClick={() => onDelete(job._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
  top: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  company: { fontSize: '18px', fontWeight: 'bold' },
  role: { color: '#666', fontSize: '14px', marginTop: '4px' },
  badge: { padding: '4px 12px', borderRadius: '20px', color: '#fff', fontSize: '12px', fontWeight: 'bold' },
  notes: { color: '#555', fontSize: '14px', marginBottom: '8px' },
  date: { color: '#999', fontSize: '12px', marginBottom: '12px' },
  actions: { display: 'flex', gap: '12px', alignItems: 'center' },
  select: { padding: '6px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' },
  deleteBtn: { padding: '6px 14px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  editBtn: {
  padding: '6px 14px', backgroundColor: '#4f46e5',
  color: '#fff', border: 'none', borderRadius: '6px',
  cursor: 'pointer', fontSize: '14px'
},
};

export default JobCard;