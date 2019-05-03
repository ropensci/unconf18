jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

	//populate participants
	var jqxhr = $.getJSON("participants.json", function(data){
		var participants = $("#participantlist");
		$.each( data, function( key, val ) {
			var person = $('<div />', {"class": 'participant'});
			var photo = $('<div />', {"class": 'participant-image'}).
				css("background-image", 'url(' + val.photo + ')').
				css("background-repeat", "no-repeat").
				css("background-size", "cover").
				appendTo(person);
			person.append('<h3 class="participant-name"><a href="' + val.link + '">' + val.name + '</a></h3>');
			var affils = $('<p />', {"class": 'participant-affiliation'});
			var affildata = $.map(val.affil, function(afx, i){
				return afx.link ? ('<a href="' + afx.link + '">' + afx.name + '</a>') : afx.name;
			});
			affils.append(affildata.join(", "));
			affils.appendTo(person);
			person.appendTo(participants);
		});
	}).fail(function( jqxhr, textStatus, error ) {
		alert("Failure loading participants.json:\n" + error );
	});
});
