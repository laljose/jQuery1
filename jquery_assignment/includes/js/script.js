// My Custom JQuery
var pageNo=1;
var num=1;
function getMovie(num)
{
	$('#result li').remove();
	var tem=$('#searchInput').val().trim();

	$.ajax({
		type: 'GET',
			url:'http://www.omdbapi.com/?s=' + tem + '&page=' + pageNo,
			success : function (data) {
				$.each(data['Search'], function(i, Title){
					$("#listheading").html("<u><b>Search Results:</b></u>");
					$('#result').append('<h5><li value='+num+'><a href="#movies">'+Title.Title+'</a></li></h5>');
					if(i==0)
					{
						if(Title.Poster=='N/A'){
								$("#image").attr("src","media/images/poster.png");
							}
							else{
								$("#image").attr("src",Title.Poster);
							}	
						$("#title").html("Movie Name: "+Title.Title+"<br>Year: "+Title.Year);
					}
					$('li').click(function(){
						var $name=$(this).text();
						if(Title.Title==$name)
						{
							if(Title.Poster=='N/A'){
								$("#image").attr("src","media/images/poster.png");
							}
							else{
								$("#image").attr("src",Title.Poster);
							}
							$("#title").html("Movie Name: "+Title.Title+"<br>Year: "+Title.Year);
						}
					});	
					num++;	
				});
			$(".pagination").attr("style","visibility:visible");	
			},
			 error: function(e) {
			 	console.log("no data");
  			}
		});

}
$('#next').click(function(){
	pageNo++;
	num+=10;
	getMovie(num)
});	
$('#previous').click(function(){
	if(pageNo > 1){
		pageNo--;
		num-=10;
		getMovie(num)
	}
});		