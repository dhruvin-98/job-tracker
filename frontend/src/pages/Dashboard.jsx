import { useState, useEffect } from 'react';
import API from '../api';
import JobCard from '../components/JobCard';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', notes: '' });
  const [showForm, setShowForm] = useState(false);
  const name = localStorage.getItem('name');
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', form);
      setForm({ company: '', role: '', status: 'Applied', notes: '' });
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await API.put(`/jobs/${id}`, { status });
      fetchJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>Job Tracker</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Hi, {name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.stats}>
        {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
          <div key={status} style={styles.statCard}>
            <h3>{jobs.filter(j => j.status === status).length}</h3>
            <p>{status}</p>
          </div>
        ))}
      </div>

      {/* Add Job Button */}
      <div style={styles.addSection}>
        <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Job'}
        </button>
      </div>

      {/* Add Job Form */}
      {showForm && (
        <div style={styles.formBox}>
          <form onSubmit={handleSubmit}>
            <input style={styles.input} name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
            <input style={styles.input} name="role" placeholder="Role" value={form.role} onChange={handleChange} required />
            <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <textarea style={styles.input} name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} />
            <button style={styles.addBtn} type="submit">Save Job</button>
          </form>
        </div>
      )}

      {/* Job Cards */}
      <div style={styles.jobList}>
        {jobs.length === 0
          ? <p style={styles.empty}>No jobs added yet. Click "+ Add Job" to start.</p>
          : jobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
            />
          ))
        }
      </div>

    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f4f4f4' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4f46e5', padding: '16px 32px' },
  logo: { color: '#fff', fontSize: '20px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  welcome: { color: '#fff', fontSize: '14px' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#fff', color: '#4f46e5', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  stats: { display: 'flex', justifyContent: 'center', gap: '16px', padding: '24px 32px' },
  statCard: { backgroundColor: '#fff', padding: '16px 32px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
  addSection: { display: 'flex', justifyContent: 'flex-end', padding: '0 32px' },
  addBtn: { padding: '10px 20px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  formBox: { backgroundColor: '#fff', margin: '16px 32px', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' },
  jobList: { padding: '16px 32px' },
  empty: { textAlign: 'center', color: '#888', marginTop: '40px' }
};

export default Dashboard;