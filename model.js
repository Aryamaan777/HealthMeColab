var input_predictions=[];
var diseases=['(vertigo) Paroymsal  Positional Vertigo','AIDS','Acne','Alcoholic hepatitis','Allergy','Arthritis','Bronchial Asthma','Cervical spondylosis','Chicken pox','Chronic cholestasis','Common Cold','Dengue','Diabetes ','Dimorphic hemmorhoids(piles)','Drug Reaction','Fungal infection','GERD','Gastroenteritis','Heart attack','Hepatitis B','Hepatitis C','Hepatitis D','Hepatitis E','Hypertension ','Hyperthyroidism','Hypoglycemia','Hypothyroidism','Impetigo','Jaundice','Malaria','Migraine','Osteoarthristis','Paralysis (brain hemorrhage)','Peptic ulcer diseae','Pneumonia','Psoriasis','Tuberculosis','Typhoid','Urinary tract infection','Varicose veins','hepatitis A'];
var symptoms=[' abdominal_pain',' abnormal_menstruation',' acidity',' acute_liver_failure',' altered_sensorium',' anxiety',' back_pain',' belly_pain',' blackheads',' bladder_discomfort',' blister',' blood_in_sputum',' bloody_stool',' blurred_and_distorted_vision',' breathlessness',' brittle_nails',' bruising',' burning_micturition',' chest_pain',' chills',' cold_hands_and_feets',' coma',' congestion',' constipation',' continuous_feel_of_urine',' continuous_sneezing',' cough',' cramps',' dark_urine',' dehydration',' depression',' diarrhoea',' dischromic _patches',' distention_of_abdomen',' dizziness',' drying_and_tingling_lips',' enlarged_thyroid',' excessive_hunger',' extra_marital_contacts',' family_history',' fast_heart_rate',' fatigue',' fluid_overload',' foul_smell_of urine',' headache',' high_fever',' hip_joint_pain',' history_of_alcohol_consumption',' increased_appetite',' indigestion',' inflammatory_nails',' internal_itching',' irregular_sugar_level',' irritability',' irritation_in_anus',' joint_pain',' knee_pain',' lack_of_concentration',' lethargy',' loss_of_appetite',' loss_of_balance',' loss_of_smell',' malaise',' mild_fever',' mood_swings',' movement_stiffness',' mucoid_sputum',' muscle_pain',' muscle_wasting',' muscle_weakness',' nausea',' neck_pain',' nodal_skin_eruptions',' obesity',' pain_behind_the_eyes',' pain_during_bowel_movements',' pain_in_anal_region',' painful_walking',' palpitations',' passage_of_gases',' patches_in_throat',' phlegm',' polyuria',' prominent_veins_on_calf',' puffy_face_and_eyes',' pus_filled_pimples',' receiving_blood_transfusion',' receiving_unsterile_injections',' red_sore_around_nose',' red_spots_over_body',' redness_of_eyes',' restlessness',' runny_nose',' rusty_sputum',' scurring',' shivering',' silver_like_dusting',' sinus_pressure',' skin_peeling',' skin_rash',' slurred_speech',' small_dents_in_nails',' spinning_movements',' spotting_ urination',' stiff_neck',' stomach_bleeding',' stomach_pain',' sunken_eyes',' sweating',' swelled_lymph_nodes',' swelling_joints',' swelling_of_stomach',' swollen_blood_vessels',' swollen_extremeties',' swollen_legs',' throat_irritation',' toxic_look_(typhos)',' ulcers_on_tongue',' unsteadiness',' visual_disturbances',' vomiting',' watering_from_eyes',' weakness_in_limbs',' weakness_of_one_body_side',' weight_gain',' weight_loss',' yellow_crust_ooze',' yellow_urine',' yellowing_of_eyes',' yellowish_skin','itching'];
var value;
var last=3;
var body=document.getElementsByTagName("body")[0];
var buttons=document.getElementsByTagName("button");
var search=document.getElementById("search").value;
var chosen=document.getElementById("chosen");
console.log(search);
var search=0;

function check_theme() {
	if(window.matchMedia('(prefers-color-scheme: dark)').matches)
		$("#favicon").attr("href","images/favicon_dark.ico");
	else
		$("#favicon").attr("href","favicon.ico");
}

// Initial Suggestions
for(var i=0;i<4;i++)
{
	var button=buttons[i];
	button.innerHTML=symptoms[i].replaceAll("_", " ");
	button.value=symptoms[i];
	button.style.display="block";
}

// Chosen Symptoms
for(var i=0;i<symptoms.length;i++)
{
	var button=document.createElement("button");
	button.innerHTML=symptoms[i].replaceAll("_", " ");
	button.value=symptoms[i];
	button.id=i;
	button.style.display="none";
	//console.log(button.id);
	chosen.appendChild(button);
	document.write("<br>");

	//body.appendChild("<br>");
}
/*document.write("<h3>Prediction:</h3>");
document.write("<p id=\"prediction\" style=\"{float:right;}\">Choose Atleast 3 Symptoms!</p>");*/
async function run(){
	const model =  await tf.loadLayersModel('model/model.json');
	/*var value=tf.tensor([130,99,72,32,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);
	value=tf.reshape(value,[1,17]);
	var pred = model.predict(value);
	var forind=pred.argMax(-1).toString();
	var ind=forind.substring(12,forind.length-1);
	console.log(diseases[ind]);*/
	var l=input_predictions.length;
	if(l>17)
	{
		alert("TOO MANY SYMPTOMS");
	}
	else if(l>2)
	{
		while(input_predictions.length<17)
		{
			input_predictions.push(-1);
		}
		value=tf.tensor(input_predictions);
		value=tf.reshape(value,[1,17]);
		var pred = model.predict(value);
		var forind=pred.argMax(-1).toString();
		var ind=forind.substring(12,forind.length-1);
		console.log(diseases[ind]);
		$("#prediction").text(diseases[ind]);
		input_predictions=input_predictions.slice(0,l);
	}
	if(l<3)
	{
		$("#prediction").text("Choose Atleast 3 Symptoms!");
	}
	//pred.print();
}

function findSymp(){
	search=1;
	for(var i=0;i<4;i++)
	{
		var button=buttons[i];
		button.style.display="block";
	}
	var search=document.getElementById("search").value;
	console.log(search);
	var regex=new RegExp("^"+search, "i");
	var regex2=new RegExp("^ "+search, "i");
	var possible_symptoms=[]
	for(var i=0;i<symptoms.length;i++)
	{
		if(regex.test(symptoms[i])==true)
		{
			possible_symptoms.push(symptoms[i]);
		}
		else if(regex2.test(symptoms[i])==true)
		{
			possible_symptoms.push(symptoms[i]);
		}
	}
	length_to_display=4;
	if(possible_symptoms.length<4)
	{
		length_to_display=possible_symptoms.length;
	}
	for(var i=0;i<length_to_display;i++)
	{
		var button=buttons[i];
		button.innerHTML=possible_symptoms[i].replaceAll("_", " ");
		button.value=possible_symptoms[i];	
	}
	console.log(length_to_display);
	for(var i=length_to_display;i<4;i++)
	{
		var button=buttons[i];
		button.style.display="none";
	}
	console.log(possible_symptoms);
	possible_symptoms=[];
}

$("button").click(function(){
	var val=$(this).val();
	var ck=0;
	for(var i=0;i<input_predictions.length;i++)
	{
		if(input_predictions[i]==symptoms.indexOf(val))
		{
			ck=1;
			input_predictions.splice(i,1);
			$(this).hide();
		}
	}
	if(ck==0)
	{
		input_predictions.push(symptoms.indexOf(val));
		var id="#"+symptoms.indexOf(val);
		$(id).show();
	}
	console.log(input_predictions);
	last=last+1;
	$(this).html(symptoms[last].replaceAll("_", " "));
	$(this).val(symptoms[last]);
	run();
});

// Prevent submit on enter
$('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});

// Share
const shareButton = document.querySelector('#share-button');

shareButton.addEventListener('click', event => {
  if (navigator.share) { 
   navigator.share({
      title: 'Coronavirus Live Tracker',
      url: 'https://coronavirus-live-tracker.herokuapp.com/'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else {
        shareDialog.classList.add('is-open');
    }
});

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
});