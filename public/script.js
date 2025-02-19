async function analyze() {
    const url = document.getElementById('url').value;
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }
  
    // Show loading spinner
    document.getElementById('loading').classList.remove('hidden');
  
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        displayResults(data.vitals, data.recommendations, data.eeatChecklist);
      } else {
        alert(data.error || 'Failed to analyze the URL');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while analyzing the URL. Please try again.');
    } finally {
      // Hide loading spinner
      document.getElementById('loading').classList.add('hidden');
    }
  }
  
  function displayResults(vitals, recommendations, eeatChecklist) {
    const vitalsReport = document.getElementById('vitalsReport');
    const recommendationsDiv = document.getElementById('recommendations');
    const eeatChecklistDiv = document.getElementById('eeatChecklist');
  
    // Display Core Web Vitals
    vitalsReport.innerHTML = `
      <h3>Core Web Vitals</h3>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> ${vitals.LCP}</li>
        <li><strong>FID (First Input Delay):</strong> ${vitals.FID}</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> ${vitals.CLS}</li>
      </ul>
    `;
  
    // Display Actionable Recommendations
    recommendationsDiv.innerHTML = `
      <h3>Actionable Recommendations</h3>
      <ul>
        ${recommendations.map((rec) => `<li>${rec}</li>`).join('')}
      </ul>
    `;
  
    // Display E-E-A-T Compliance Checklist
    eeatChecklistDiv.innerHTML = `
      <h3>E-E-A-T Compliance Checklist</h3>
      <ul>
        ${eeatChecklist.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `;
  
    // Show Premium Section
    document.getElementById('premiumSection').classList.remove('hidden');
  }
  
  function subscribe() {
    alert("Thank you for subscribing! Redirecting to payment page...");
    // Redirect to payment page or handle subscription logic
    window.location.href = "https://payment-page.com"; // Replace with your payment page URL
  }
  
  // Add event listener for the Analyze button
  document.getElementById('analyzeButton').addEventListener('click', analyze);