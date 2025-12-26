import os
DEBUG = os.getenv("DEBUG") == "True"

if DEBUG:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
else:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.privateemail.com'
EMAIL_HOST_USER = 'support@lemarketprice.com'
EMAIL_HOST_PASSWORD='A@12Bcdef'
EMAIL_PORT=465
EMAIL_USE_SSL = True