<template>
  <div class="copyright-page">
    <div class="copyright-content">
      <h2>Copyright Statement</h2>
      <p>
        All content on <strong>Tower Jump</strong>, including but not limited to text, graphics, images, videos, and software, is the property of <strong>Tower Jump</strong> and is protected by international copyright laws. Unauthorized use, reproduction, or distribution of this content is strictly prohibited.
      </p>

      <h2>What We Own</h2>
      <ul>
        <li><strong>Original Content:</strong> All written content, guides, tutorials, and reviews created by our team.</li>
        <li><strong>Website Design:</strong> Layout, styling, user interface, and overall website design elements.</li>
        <li><strong>Original Images:</strong> Photographs, screenshots, and graphics created specifically for this website.</li>
        <li><strong>Code & Software:</strong> Website code, scripts, and software developed for this platform.</li>
      </ul>

      <h2>Third-Party Content</h2>
      <p>
        We respect the intellectual property rights of others. Some content on our website may include references, images, or information related to various games, which belongs to their respective owners.
      </p>

      <h2>Fair Use Policy</h2>
      <p>
        We support fair use of our content for educational, research, and personal purposes. However, commercial use requires explicit permission.
      </p>
      <p><strong>Allowed Uses:</strong></p>
      <ul>
        <li>Personal study and research</li>
        <li>Educational purposes</li>
        <li>Non-commercial sharing</li>
        <li>Criticism and commentary</li>
      </ul>
      <p><strong>Restricted Uses:</strong></p>
      <ul>
        <li>Commercial reproduction</li>
        <li>Mass distribution</li>
        <li>Modification without permission</li>
        <li>Removal of attribution</li>
      </ul>

      <h2>DMCA Compliance</h2>
      <p>
        We comply with the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted work has been used without permission, please contact us immediately.
      </p>
      <p><strong>To file a DMCA takedown notice, please include:</strong></p>
      <ul>
        <li>Specific details about the copyrighted material</li>
        <li>Proof that you own the rights to the content</li>
        <li>A formal DMCA takedown notice sent to our designated agent</li>
      </ul>

      <h2>Attribution Requirements</h2>
      <p>
        When using our content under fair use or with permission, proper attribution is required.
      </p>

      <h2>License Requests</h2>
      <p>
        For commercial use, licensing, or other permissions, please contact us with your specific request.
      </p>
      <p><strong>Your request should include:</strong></p>
      <ul>
        <li>Specific content you want to use</li>
        <li>Intended purpose and audience</li>
        <li>Duration of use</li>
        <li>Contact information</li>
      </ul>

      <h2>Contact Information</h2>
      <p>
        Email: <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a>
      </p>

      <h2>Updates to Copyright Notice</h2>
      <p>
        This copyright notice may be updated periodically. The most recent version will always be available on this page. Continued use of our website constitutes acceptance of any changes.
      </p>
      <p>
        Check this page regularly for updates to our copyright policy.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Copyright - Tower Jump'
})
</script>

<style scoped>
.copyright-page {
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  padding: 40px 20px;
}

.copyright-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 50px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright-content h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #e8e8ee;
  position: relative;
  padding-left: 15px;
  line-height: 1.5;
}

.copyright-content h2:before {
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

.copyright-content p {
  font-size: 16px;
  color: #e8e8ee;
  line-height: 1.6;
  margin-bottom: 20px;
}

.copyright-content ul {
  margin-bottom: 20px;
  padding-left: 0;
}

.copyright-content li {
  list-style: none;
  position: relative;
  padding: 10px 0 10px 20px;
  color: #e8e8ee;
  font-size: 16px;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright-content li:before {
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

.copyright-content strong {
  color: #f3f4f6;
  font-weight: 600;
}

.copyright-content a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.copyright-content a:hover {
  color: #93c5fd;
  border-bottom-color: #60a5fa;
}

@media (max-width: 768px) {
  .copyright-content {
    padding: 20px;
    border-radius: 16px;
  }

  .copyright-content h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .copyright-content p,
  .copyright-content li {
    font-size: 14px;
    line-height: 1.5;
  }

  .copyright-content li {
    padding: 8px 0 8px 15px;
  }

  .copyright-content p {
    margin-bottom: 15px;
  }
}
</style>
