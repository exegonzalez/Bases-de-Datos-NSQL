from functionsDB import \
    generate_chapters, \
    pay_chapter, \
    rent_chapter, \
    status_chapter, \
    list_available_chapters, \
    list_rented_chapters, \
    list_reserved_chapters

from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/generate-chapters')
def load_chapters():
    """Generar capitulos."""
    msj = generate_chapters()
    return msj

@app.route('/chapter/<state>')
def to_list_by_status(state):
    """Retorna el listado de capitulos por estado."""
    if(state=='disponible'):
        lista = list_available_chapters()
        return jsonify(lista)
    if(state=='reservado'):
        lista = list_reserved_chapters()
        return jsonify(lista)
    if(state=='alquilado'):
        lista = list_rented_chapters()
        return jsonify(lista)

@app.route('/chapter/<capitulo>/rent')
def rent(capitulo):
    """Retorna la pagina para alquilar capitulos."""
    msj = rent_chapter(capitulo)
    return msj

@app.route('/chapter/<capitulo>/pay/<prec>')
def pay(capitulo, prec):
    """Retorna la pagina para pagar los capitulos."""
    msj = pay_chapter(capitulo,prec)
    return msj

@app.route('/chapter/<capitulo>/status')
def status(capitulo):
    """Retorna la pagina para pagar los capitulos."""
    msj = status_chapter(capitulo)
    return msj

if __name__ == "__main__":
    app.run(host='localhost', port='5000', debug=True)

