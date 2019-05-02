var participants = $.map($('.participant'), function(val, i){
	var p = $(val);
	var img = p.find('.participant-image').css('background-image');
	var imgurl = img.replace('url("http://unconf18.ropensci.org', '.').replace('")', '');
	var name = p.find('.participant-name').text();
	var link = p.find('.participant-name').find('a').attr("href");
	var aflinks = $.map(p.find('.participant-affiliation').find('a'), function(val, i){
		af = $(val);
		afname = af.text();
		aflink = af.attr("href");
		return {
			name : afname,
			link : aflink
		};
	});
	var aftext = p.find('.participant-affiliation').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE && this.length > 5;
	}).text();
	if(aftext){
		aflinks.push({name : aftext.replace(/\s*,\s*$/, "").replace(/^\s*,\s*/, "")});
	}
	return {
		name : name,
		link : link,
		photo : imgurl,
		affil : aflinks
	};
});

JSON.stringify(participants, null, 2)
