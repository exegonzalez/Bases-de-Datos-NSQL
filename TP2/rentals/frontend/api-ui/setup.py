from setuptools import setup

setup(name='api-ui',
      version='0.1',
      description='UI application for rentals API',
      url='https://github.com/exegonzalez/Bases-de-Datos-NSQL',
      author='Gonzalez Exequiel, Cepeda Leandro',
      author_email='exe.gye@gmail.com',
      license='MIT',
      packages=['requests, flask'],
      install_requires=[
          'requests, flask',
      ],
      zip_safe=False)
