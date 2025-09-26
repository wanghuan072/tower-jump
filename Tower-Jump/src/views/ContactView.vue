<template>
  <div class="contact-page">
    <div class="contact-content">
      <h2>Get in Touch</h2>
      <p>We'd love to hear from you! Whether you have questions about our services, suggestions for improvement, or just want to say hello, we're here to help.</p>

      <h2>Contact Information</h2>
      <p><strong>Email:</strong> <a href="mailto:wyong@towerjump.org">wyong@towerjump.org</a></p>
      <p>We typically respond within 24 hours.</p>

      <h2>Response Time</h2>
      <ul>
        <li><strong>Monday - Friday:</strong> Within 24 hours</li>
        <li><strong>Weekends:</strong> Within 48 hours</li>
      </ul>

      <h2>What We Can Help With</h2>
      <ul>
        <li><strong>Account or Access Issues:</strong> Help with login, membership, or subscription problems</li>
        <li><strong>Website Feedback:</strong> Suggestions for improving Tower Jump</li>
        <li><strong>Content Requests:</strong> Ideas for new articles, guides, or resources</li>
        <li><strong>Technical Support:</strong> Assistance with site functionality</li>
        <li><strong>Partnership Inquiries:</strong> Collaboration opportunities</li>
        <li><strong>General Questions:</strong> Anything else related to Tower Jump and our services</li>
      </ul>

      <h2>Before You Contact Us</h2>
      <p>To help us provide the best assistance, please include the following details in your email:</p>
      <ul>
        <li>Your specific question or issue</li>
        <li>Any error messages (if applicable)</li>
        <li>Steps you've already tried</li>
        <li>Your device and browser information (if relevant)</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <ul>
        <li><strong>How often is your content updated?</strong><br>We update our resources regularly to ensure accuracy and freshness.</li>
        <li><strong>Is your content safe and reliable?</strong><br>Yes, all information we provide is verified and sourced responsibly.</li>
        <li><strong>Can I suggest new content?</strong><br>Absolutely! We welcome your ideas and contributions—just send them our way.</li>
      </ul>

      <h2>Business Hours</h2>
      <p>Our team is available Monday through Friday, 9:00 AM to 6:00 PM (EST). While we may respond outside these hours, please allow up to 24–48 hours for replies during weekends and holidays.</p>

      <h2>Privacy</h2>
      <p>We respect your privacy and will never share your personal information with third parties. All communications are kept confidential and used only to provide you with the best possible service.</p>

      <h2>Thank You</h2>
      <p>Thank you for being part of the Tower Jump community! Your feedback and support help us continue to provide the best experience for our users worldwide.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = 'Contact Us - Tower Jump'
})
</script>

<style scoped>
.contact-page {
  background: #0f0f14;
  color: #e8e8ee;
  min-height: 100vh;
  padding: 40px 20px;
}

.contact-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 50px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-content h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #e8e8ee;
  position: relative;
  padding-left: 15px;
  line-height: 1.5;
}

.contact-content h2:before {
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

.contact-content p {
  font-size: 16px;
  color: #e8e8ee;
  line-height: 1.6;
  margin-bottom: 20px;
}

.contact-content ul {
  margin-bottom: 20px;
  padding-left: 0;
}

.contact-content li {
  list-style: none;
  position: relative;
  padding: 10px 0 10px 20px;
  color: #e8e8ee;
  font-size: 16px;
  line-height: 1.6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-content li:before {
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

.contact-content strong {
  color: #f3f4f6;
  font-weight: 600;
}

.contact-content a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.contact-content a:hover {
  color: #93c5fd;
  border-bottom-color: #60a5fa;
}

@media (max-width: 768px) {
  .contact-content {
    padding: 20px;
    border-radius: 16px;
  }

  .contact-content h2 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .contact-content p,
  .contact-content li {
    font-size: 14px;
    line-height: 1.5;
  }

  .contact-content li {
    padding: 8px 0 8px 15px;
  }

  .contact-content p {
    margin-bottom: 15px;
  }
}
</style>
