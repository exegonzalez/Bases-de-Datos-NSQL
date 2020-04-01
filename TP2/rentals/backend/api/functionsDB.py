from connectionDB import connect_db

def generate_chapters():
    con = connect_db()
    con.flushdb()
    con.hset("Chapter 1: The Mandalorian", "estado", 'disponible')
    con.hset("Chapter 2: The Child", "estado", 'disponible')
    con.hset("Chapter 3: The Sin", "estado", 'disponible')
    con.hset("Chapter 4: Sanctuary", "estado", 'disponible')
    con.hset("Chapter 5: The Gunslinger", "estado", 'disponible')
    con.hset("Chapter 6: The Prisoner", "estado", 'disponible')
    con.hset("Chapter 7: The Reckoning", "estado", 'disponible')
    con.hset("Chapter 8: Redemption", "estado", 'disponible')
    return 'OK'

def rent_chapter(chapter):
    con = connect_db()
    con.hset(chapter, "estado", 'reservado')
    con.setex('reservado'+chapter, 240, chapter)
    return "{} reservado por 4 minutos".format(chapter)

def status_chapter(chapter):
    con = connect_db()
    con.hset(chapter, "estado", 'reservado')
    status = con.hget(chapter,"estado")
    return "{}".format(status)

def pay_chapter(chapter,prec):
    con = connect_db()
    if(con.pttl('reservado'+chapter) != -2):
        con.delete('reservado'+chapter)
        con.hset(chapter, "precio", prec)
        con.hset(chapter, "estado", 'alquilado')
        con.setex('alquilado'+chapter, 1440, chapter)
        return "{} alquilado por 24hs".format(chapter)
    else:
        con.hset(chapter, "estado", 'disponible')
        return "{} no esta reservado".format(chapter)

def list_available_chapters():
    con = connect_db()
    aux = []
    chapters = ["Chapter 1: The Mandalorian","Chapter 2: The Child","Chapter 3: The Sin","Chapter 4: Sanctuary","Chapter 5: The Gunslinger","Chapter 6: The Prisoner","Chapter 7: The Reckoning","Chapter 8: Redemption"]
    for chapter in chapters:
        if(con.pttl('reservado'+chapter) == -2 and con.pttl('alquilado'+chapter) == -2): 
            con.hset(chapter, "estado", 'disponible')
        if(con.hget(chapter,"estado")=='disponible'):
            aux.append(chapter)
    return aux

def list_reserved_chapters():
    con = connect_db()
    aux = []
    chapters = ["Chapter 1: The Mandalorian","Chapter 2: The Child","Chapter 3: The Sin","Chapter 4: Sanctuary","Chapter 5: The Gunslinger","Chapter 6: The Prisoner","Chapter 7: The Reckoning","Chapter 8: Redemption"]
    for chapter in chapters:
        if(con.hget(chapter,"estado")=='reservado'):
            aux.append(chapter)
    return aux

def list_rented_chapters():
    con = connect_db()
    aux = []
    chapters = ["Chapter 1: The Mandalorian","Chapter 2: The Child","Chapter 3: The Sin","Chapter 4: Sanctuary","Chapter 5: The Gunslinger","Chapter 6: The Prisoner","Chapter 7: The Reckoning","Chapter 8: Redemption"]
    for chapter in chapters:
        if(con.hget(chapter,"estado")=='alquilado'):
            aux.append(chapter)
    return aux
    