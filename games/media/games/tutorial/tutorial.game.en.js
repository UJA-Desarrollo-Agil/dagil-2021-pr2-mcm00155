// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>En casa</h1>\
        <p>Es viernes por la mañana. Estoy atendiendo a las clases de la\
        universidad como todos los dias, aunque no paro de dar cabezadas.</p><br>\
        <img src='./media/img/clases.jpeg' height='320' width='500'>\
        <p>Cuando por fin termino las clases, mis padres me mandan a comprar\
        pollo para la comida de hoy. Eran las 11:30 cuando terminé las clases\
        asi que no había prisa. Puedo <a href='puertasupermercado'>ir ya a comprar el pollo</a> o\
        ya que es temprano puedo <a href='playstation'>jugar un rato a la Playstation</a></p>"
    ),
    
    puertasupermercado: new undum.SimpleSituation(
        "<h1>Al supermercado</h1>\
        <p>Decido irme a comprar ya, así podré terminar antes con todo y si sobra\
        tiempo podré hacer otras cosas.</p><br/>\
        <center><img src='./media/img/puerta.jpg' height='420' width='480'></center><br/>\
        <p>Voy a comprar al supermercado del centro del pueblo que es donde mejor carne hay. Cuando\
        estoy a punto de entrar me encuentro con un amigo que llevaba años sin ver. Me propone ir a\
        una cafetería para ponernos al dia y hablar sobre la vida. Me parece una idea genial ya que quería\
        despejarme pero tengo que comprar el pollo. Puedo elegir entre <a href='supermercado'>entrar al supermercado primero</a>\
        o <a href='amigo'>hablar primero con él</a></p>"
    ),

    supermercado: new undum.SimpleSituation(
        "<h1>La carniceria del supermercado</h1>\
        <img src='./media/img/carniceria.jpg' height='320' width='500'><br/>\
        <p>Decido comprar ya el pollo para que no se me olvide. Voy directo a la carniceria y\
        <a href='./comprapollo' class='once'>compro el pollo</a>. Si todo ha salido bien ya podemos\
        <a href='cafeteria'>ir a la cafeteria</a></p>",
        {
            actions: {
                'comprapollo': function(character, system, action) {
                    system.setQuality("Pollo", true);
                }
            }
        }
    ),

    cafeteria: new undum.SimpleSituation(
        "<h1>Hacia la cafeteria</h1>\
        <p>Salgo del supermercado y me voy con mi amigo dirección cafeteria.\
        A la cafeteria a la que íbamos hacían unas tostadas gratinadas y unos churros\
        que se te quitaban las ganas de comer al mediodia.</p>",
        {
            enter: function( character, system, from ){
                if( character.qualities.Pollo) {
                    system.doLink( "cafeteriapollo" );
                } else {
                    system.doLink( "cafeteriasinpollo");
                }
            }
        }
    ),

    cafeteriapollo: new undum.SimpleSituation(
        "<img src='./media/img/cafeteria.jpg' height='320' width='500'><br/>\
        <p>Una vez llegamos con el pollo ya comprado, hablamos durante un rato de camino\
        a la cafeteria. Llegamos y entre un cafe y varias risas, nos íbamos contando todo\
        lo que habíamos vivido. Tras un buen rato sin parar de hablar, me ofrece el ir a su\
        casa junto con unos amigos más a tomar algo. Eran las 13:00 así que tenía tiempo aún para\
        llegar a casa. Decido entre <a href='irconamigo'>ir con él</a> o <a href='noir'>volver a casa</a></p>"
    ),

    cafeteriasinpollo: new undum.SimpleSituation(
        "<p>Mientras íbamos para allá y nos contábamos nuestras\
        aventuras estos últimos años, me doy cuenta de que he entrado al\
        supermercado y no he comprado el pollo al final asi que tenemos que\
        volver al <a href='supermercado'>supermercado</a> para comprarlo</p>"
    ),


    irconamigo: new undum.SimpleSituation(
        "<h1>A casa</h1>\
        <p>Decido ir pero al estar entre bromas, se me olvida el pollo en la cafeteria.\
        <center><img src='./media/img/decepcion.jpg' height='320' width='420'></center>\
        Tras tomarme algo en su casa, vuelvo a casa y mis padres preguntan que dónde estaba\
        el pollo. En ese momento es cuando sentí el verdadero terror.</p>\
        <h1>Fin de la aventura😔</h1>",
        {
            enter: function( character, system, from ){
                system.setQuality("Pollo", character.qualities.Pollo-1);
            }
        }
    ),

    noir: new undum.SimpleSituation(
        "<h1>A casa</h1>\
        <p>Decido no ir para poder hacer la comida a tiempo. Mi amigo y yo nos damos un abrazo y\
        decidimos quedar otro dia en su casa para hablar mas tranquilos y sin prisas</p><br>\
        <center><img src='./media/img/triunfo.jpg' height='340' width='370'></center><br/>\
        <p>Llego a casa con tiempo de sobra para poder jugar y con el mejor pollo del pueblo. Quedó una\
        comida de escándalo.</p>\
        <h1>Fin de la aventura😎</h1>"
    ),

    amigo: new undum.SimpleSituation(
        "<h1>Con mi amigo</h1>\
        <p>Decido primero hablar con él porque tenía tiempo de sobra. Un amigo que no ves hace mucho tiempo hace\
	    que la conversación se alargue mucho y esta no fue menos. Miro el reloj y son las 13:30.</p><br>\
        <center><img src='./media/img/llorar.jpg' height='340' width='370'></center>\
        <p>Efectivamente, supermercado cerrado. Tampoco me daba tiempo a ir al otro supermercado que\
        estaba en la otra punta asi que gané un amigo que llevaba tiempo sin hablar conmigo pero, \
        ¿A qué precio?</p>\
        <h1>Fin de la aventura😔</h1>"
    ),

    playstation: new undum.SimpleSituation(
        "<p>Decido quedarme un rato con la play, total, es temprano y hay tiempo de sobra.</p><br>\
        <h1>En mi habitación</h1>\
        <p>Una vez ya estoy en mi habitación, me pongo a jugar a unos de mis juegos favoritos que me falta poco para terminarlo.</p><br>\
        <center><img src='./media/img/cuarto.jpg' height='370' width='340'></center>\
        <p>Tras pasarme unas cuantas misiones del juego, me doy cuenta de que son casi las 13:00. He perdido la noción del tiempo\
        totalmente. Decido entre <a href='supermercado1'>ir al supermercado donde siempre voy</a> que está a nada de cerrar o\
        <a href='supermercado2'>voy al otro supermercado</a> que está en la otra punta del pueblo que cierra a las 14:00.</p>"
    ),

    supermercado1: new undum.SimpleSituation(
        "<h1>Corriendo hacia el supermercado</h1>\
        <p>Voy al del centro. Correcto, está cerrado. Solo tengo la opción de <a href='super2mal'>ir al otro supermercado</a>\
        corriendo.</p>"
    ),

    super2mal: new undum.SimpleSituation(
        "<h1>En el otro supermercado</h1>\
        <p>Eran ya las 14:00 cuando llegué y justo acababan de cerrar.</p><br>\
        <center><img src='./media/img/perro.png' height='370' width='350'></center>\
        <p>Vuelvo a mi casa sin pollo pero por lo menos he hecho deporte recorriendo todo el pueblo. Por cierto, también me quedé sin play 🙃</p>\
        <h1>Fin de la aventura😔</h1>"
    ),

    supermercado2: new undum.SimpleSituation(
        "<p>Decido ir al que está en la otra punta del pueblo.</p>\
        <h1>En el otro supermercado</h1>\
        <center><img src='./media/img/carniceria2.jpg' height='320' width='500'></center>\
        <p>Entré en la carniceria que estaba totalmente vacía pero allí estaba. Sólo quedaba un pollo.\
	    Decido <a href='./comprapollo2' class='once'>comprar el último pollo</a>. Una vez comprado, solo quedaba\
        <a href='casa'>volver a casa</a>.</p>",
        {
            actions: {
                'comprapollo2': function(character, system, action) {
                    system.setQuality("Pollo", true);
                }
            }
        }
    ),

    casa: new undum.SimpleSituation(
        "<h1>Por fin a casa</h1>\
        <p>He tenido mucha suerte de que este supermercado estuviera abierto pero ya está todo solucionado</p><br>",
        {
            enter: function( character, system, from ){
                if( character.qualities.Pollo) {
                    system.doLink( "casaconpollo" );
                } else {
                system.doLink( "casasinpollo");
                }
            }
        }
    ),

    casaconpollo:new undum.SimpleSituation(
        "<center><img src='./media/img/bart.gif' height='320' width='500'></center>\
        <p>Al llegar a casa, pese a que el pollo de este supermercado no era el mejor, hubo\
        tiempo para terminar la comida y no salió tan mal como pensábamos.</p>\
        <h1>Fin de la aventura😎</h1>"
    ),

    casasinpollo: new undum.SimpleSituation(
        "<p>Pues parece que no estaba todo solucionado. Se me habia olvidado comprar el pollo\
        de la emoción de ver el supermercado abierto. Tengo que volver al <a href='supermercado2'>supermercado</a> para comprarlo</p>"
    )

};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

undum.game.qualityGroups = {
    inventario: new undum.QualityGroup('Inventario', {priority:"0001"})
}

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    Pollo: new undum.OnOffQuality(
        "Pollo", {priority:"0001", group:'inventario', onDisplay:"🍗"}
    )
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    system.setQuality("Pollo", false);
};
