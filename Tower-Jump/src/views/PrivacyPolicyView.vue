<template>
  <div class="privacy-page">
    <div class="policy-content">
      <p>Last updated: September 26, 2025</p>
      
      <section>
        <h2>General Information</h2>
        <p>
          At <strong>Tower Jump</strong>, we are committed to protecting the privacy of all users of our websites and applications. This Privacy Policy applies to all services and products offered by <strong>towerjump.org</strong>. By using this Site you agree to this Privacy Policy and confirm you are of legal age to consent to its terms. Continued use of the Site following any changes to this policy will constitute acceptance of those changes.
        </p>
        <p>
          The Site is intended for visitors aged 16 and above. If you are under 16, please do not use the Site. If you are a parent or guardian and allow a child to access the Site, you consent to this Privacy Policy on their behalf.
        </p>
        <p>
          If you have questions about this Privacy Policy, contact us at <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a>.
        </p>
      </section>

      <section>
        <h2>Which Data Do We Collect?</h2>

        <h3>Data you provide</h3>
        <p>We only process personal data you voluntarily provide, for example when filling forms or contacting us. This may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3>Data collected automatically</h3>
        <p>We may collect certain data automatically during your visit, such as:</p>
        <ul>
          <li>IP address (for fraud prevention, analytics, or location-based features)</li>
          <li>Browser type and version</li>
          <li>Referring page or site</li>
          <li>Device identifiers (including mobile device IDs)</li>
          <li>Cookie and tracking data</li>
          <li>User interaction data (e.g., whether you viewed or clicked an advertisement)</li>
        </ul>

        <h3>Third-party data</h3>
        <p>If we receive personal data from third parties, we will inform you when required.</p>
      </section>

      <section>
        <h2>Why We Collect Data & Legal Basis</h2>
        <p>We collect and process personal data for purposes including, but not limited to:</p>
        <ul>
          <li>Providing, improving, and optimizing our services and content</li>
          <li>Performing contractual obligations</li>
          <li>Sending updates, newsletters, and marketing communications (where permitted)</li>
          <li>Statistical analysis and research</li>
          <li>Compliance with legal obligations (e.g., age verification)</li>
        </ul>
        <p>Legal bases for processing may include your consent, performance of a contract, legitimate interests, or compliance with legal obligations.</p>
        <p><em>Note:</em> Advertisers or third-party services may collect data via their own cookies or tracking technologies. <strong>Tower Jump</strong> is not responsible for third-party data collection practices.</p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>We retain personal data only as long as necessary to fulfil the purposes described in this policy. Data associated with inactive accounts or visitors may be deleted after a reasonable period of inactivity unless retention is required by law or for legitimate business reasons.</p>
      </section>

      <section>
        <h2>GDPR & Your Rights (EEA Residents)</h2>
        <p>If you are a resident of the European Economic Area (EEA), you have certain rights regarding your personal data, including:</p>
        <ul>
          <li>The right to access, update, or delete your personal data</li>
          <li>The right to rectification of inaccurate information</li>
          <li>The right to object to processing</li>
          <li>The right to restrict processing</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent where processing is based on consent</li>
        </ul>
        <p>We may request identity verification before fulfilling requests. For more information, you can also contact your local data protection authority.</p>
      </section>

      <section>
        <h2>Your Rights & Communication Preferences</h2>
        <p>You may opt out of marketing communications at any time by contacting <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a> or by following unsubscribe instructions included in such communications. To request correction, deletion, or restriction of processing, please provide a clear reason for the request to help us verify and fulfil it promptly.</p>
      </section>

      <section>
        <h2>Cookies</h2>

        <h3>What are cookies?</h3>
        <p>Cookies are small files stored on your device that help websites remember preferences and improve user experience. Web beacons are small, typically transparent images used to monitor user behavior.</p>

        <h3>Types of cookies</h3>
        <ul>
          <li><strong>First-party cookies</strong>: Placed by this Site to support technical features (e.g., language settings, session handling).</li>
          <li><strong>Third-party cookies</strong>: Placed by external providers (e.g., analytics, advertising networks) and used to track browsing behavior across sites.</li>
        </ul>

        <h3>Which cookies we use</h3>
        <p><strong>Tower Jump</strong> uses first-party cookies to enhance usability and may allow third-party cookies (for example, Google Analytics or advertising partners) to provide analytics and advertising services. Cookies essential for site function do not require consent; other cookies may require your permission.</p>

        <h3>How to manage cookies</h3>
        <p>You may manage or disable cookies via your browser settings. Refer to your browser's support documentation (Chrome, Firefox, Safari, Edge/Internet Explorer, Opera) for instructions on blocking or removing cookies.</p>
      </section>

      <section>
        <h2>Security Measures</h2>
        <p>We implement reasonable technical and organizational measures to protect personal data and restrict access to authorized personnel only. We do not sell or rent your personal data. When external processors are used, they are contractually required to protect and securely process data and to delete it after completing assigned tasks.</p>
      </section>

      <section>
        <h2>Contact Information</h2>
        <p>If you have questions or concerns about this Privacy Policy, please contact:</p>
        <ul>
          <li>Email: <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a></li>
          <li>Website: <a href="https://towerjump.org">towerjump.org</a></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Privacy Policy - Tower Jump'
})
</script>

<style scoped>
.privacy-page {
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  padding: 40px 20px;
}

.policy-content {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.policy-content p:first-child {
  font-size: 14px;
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.policy-content section {
  margin-bottom: 30px;
}

.policy-content section:last-child {
  margin-bottom: 0;
}

.policy-content h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #e8e8ee;
  position: relative;
  padding-left: 15px;
  line-height: 1.5;
}

.policy-content h2:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 30px;
  background: linear-gradient(135deg, #ff6b6b, #ffd700);
  border-radius: 2px;
}

.policy-content h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 10px;
  color: #f3f4f6;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.policy-content p {
  font-size: 16px;
  color: #e8e8ee;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
}

.policy-content ul {
  margin-bottom: 20px;
  padding-left: 0;
}

.policy-content li {
  list-style: none;
  position: relative;
  padding: 10px 0 10px 20px;
  color: #e8e8ee;
  font-size: 16px;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.policy-content li:before {
  content: '·';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #ffd700;
  font-weight: bold;
  font-size: 18px;
}

.policy-content strong {
  color: #f3f4f6;
  font-weight: 600;
}

.policy-content em {
  color: #9ca3af;
  font-style: italic;
}

.policy-content a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.policy-content a:hover {
  color: #93c5fd;
  border-bottom-color: #60a5fa;
}

@media (max-width: 768px) {
  .policy-content {
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 20px;
  }

  .policy-content h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .policy-content h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .policy-content ul {
    margin-bottom: 15px;
  }

  .policy-content section {
    margin-bottom: 20px;
  }

  .policy-content p,
  .policy-content li {
    font-size: 14px;
    line-height: 1.5;
  }

  .policy-content li {
    padding: 8px 0 8px 15px;
  }

  .policy-content p {
    margin-bottom: 15px;
  }
}
</style>
