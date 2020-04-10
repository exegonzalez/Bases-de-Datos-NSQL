from flask import Flask, render_template, jsonify, redirect, request, url_for
import requests

app = Flask(__name__)

api_url_base = 'http://backend:5000'

@app.route('/', methods=['GET','POST'])
def index():
    chapter_status = 'disponible'

    if request.method == 'POST':
        if request.form['options']:
            chapter_status = request.form['options']
            r = requests.get('{0}/chapter/{1}'.format(api_url_base, chapter_status))
            chapters = r.json() if r.status_code == 200 else []
            return render_template('/index.html', chapters=chapters, chapter_status=chapter_status)
    
    r = requests.get('{0}/chapter/{1}'.format(api_url_base, chapter_status))
    available_chapters = r.json() if r.status_code == 200 else []

    return render_template('/index.html', chapters=available_chapters, chapter_status=chapter_status)


@app.route('/chapter/<chapter>/rent', methods=['GET'])
def rent_chapter(chapter):
    if request.method == 'GET':
        r = requests.get('{0}/chapter/{1}/rent'.format(api_url_base, chapter))
    """Retorna la pagina para pagar."""
    return redirect('/')

@app.route('/pay', methods=['GET', 'POST'])
def pay_chapter():
    if request.method == 'POST':
        if request.form['pay'] and request.form['price']:
            chapter = request.form['pay']
            price = request.form['price']
            r = requests.get('{0}/chapter/{1}/pay/{2}'.format(api_url_base, chapter.strip(), price.strip()))

    """Retorna la pagina para pagar."""
    return redirect('/')

# app name 
@app.errorhandler(404)
  
# inbuilt function which takes error as parameter 
def not_found(e): 
# defining function 
  return render_template("/components/NotFound/index.html") 


if __name__ == "__main__":
    app.run(host='frontend', port='3000', debug=True)

