export default function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Dashboard</h1>
      <p style={styles.subtitle}>
        Manage your application, track activity, and monitor key data from here.
      </p>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Orders</h3>
          <p style={styles.cardValue}>120</p>
        </div>

        <div style={styles.card}>
          <h3>Active Users</h3>
          <p style={styles.cardValue}>45</p>
        </div>

        <div style={styles.card}>
          <h3>Revenue</h3>
          <p style={styles.cardValue}>₹32,000</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#555",
    marginBottom: "30px",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    background: "#ffffff",
    padding: "20px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    minWidth: "180px",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "700",
    marginTop: "10px",
  },
};
