import { useState, useEffect } from 'react';
import API from '../api';
import JobCard from '../components/JobCard';
import { useNavigate } from 'react-router-dom';
import EditModal from '../components/EditModal';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied', notes: '',deadline: '' });
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
const [searchQuery, setSearchQuery] = useState('');
const [editingJob, setEditingJob] = useState(null);

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

  const handleEdit = async (id, updatedData) => {
  try {
    await API.put(`/jobs/${id}`, updatedData);
    fetchJobs();
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

  const filteredJobs = jobs
  .filter(job => filterStatus === 'All' || job.status === filterStatus)
  .filter(job =>
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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


      {/* Search and Filter */}
      <div style={styles.searchFilterRow}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Search by company or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div style={styles.filterButtons}>
          {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
            <button
              key={status}
              style={{
                ...styles.filterBtn,
                backgroundColor: filterStatus === status ? '#4f46e5' : '#fff',
                color: filterStatus === status ? '#fff' : '#333'
              }}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
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

             <label style={{ fontSize: '13px', color: '#555' }}>Follow-up Deadline (optional)</label>
              <input
                style={{ ...styles.input, marginTop: '4px' }}
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
              />

            <button style={styles.addBtn} type="submit">Save Job</button>
          </form>
        </div>
      )}

      {/* Job Cards */}
      <div style={styles.jobList}>
        {filteredJobs.length === 0
          ? <p style={styles.empty}>No jobs added yet. Click "+ Add Job" to start.</p>
          : filteredJobs.map(job => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
              onEdit={() => setEditingJob(job)}
            />
          ))
        }
      </div>
    {editingJob && (
      <EditModal
        job={editingJob}
        onClose={() => setEditingJob(null)}
        onSave={handleEdit}
      />
    )}
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
  empty: { textAlign: 'center', color: '#888', marginTop: '40px' },
  searchFilterRow: { display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 32px' },
searchInput: { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', width: '100%' },
filterButtons: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
filterBtn: { padding: '8px 16px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', fontSize: '13px' },
  
};

export default Dashboard;