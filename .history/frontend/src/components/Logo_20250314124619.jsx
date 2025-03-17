/* Logo component styles */
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Adjusted sizes */
.logo-sm {
  width: 16px;
  height: 16px;
}

.logo-md {
  width: 18px;
  height: 18px;
}

.logo-lg {
  width: 40px;
  height: 40px;
}

/* Apply a metallic silver effect */
.astronaut-logo {
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.4));
}

/* Enhanced metallic effect */
.astronaut-logo polygon,
.astronaut-logo rect,
.astronaut-logo line {
  /* Silver metallic gradient effect */
  fill: #D9D9D9;
  stroke: #BDBDBD;
}

/* Keep the helmet black */
.astronaut-logo circle:nth-child(2) {
  fill: #121418;
  stroke: #E5E7EB;
}