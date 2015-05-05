console.log("Init Camera Autopilot");

model._spectatorAutopilotEnabled = false;

model.toggleSpectatorAutopilot = function()
{
  console.log("Enable Camera Autopilot");
  model._spectatorAutopilotEnabled = !model._spectatorAutopilotEnabled;
};

function SpectatorAutopilot_classname()
{
    return "btn_std_ix btn_spectator_autopilot " + (model._spectatorAutopilotEnabled ? "btn_spectator_autopilot_active":"");
}

var t = 0;
var scale = 0.05;
var rad = 1;
var timeEstimation = (1/60);

model.updateSpectatorAutopilot = function()
{   
    if( model._spectatorAutopilotEnabled )
    {
        t += timeEstimation * scale;
        var z = 0.9 * rad * Math.sin(t*3) - 0.1;
        var location = {
            x: Math.sin(t) * rad,
            y: Math.cos(t) * rad,
            z: z
        };
            
        var target = {
            location: location,
            planet_id: 0
        };
        engine.call('camera.lookAt', JSON.stringify(target));
    }
}

createFloatingFrame('SpectatorAutopilot_frame', 70, 70, {'offset': 'topCenter', 'top':42});
$('#SpectatorAutopilot_frame_content').append(
  $.ajax({
    type: "GET",
    url: 'coui://ui/mods/SpectatorAutopilot/live_game/SpectatorAutopilot.html',
    async: false
  }).responseText
);

console.log("Camera Autopilot Initalized");

function tickSpecatorAutopilot()
{
    model.updateSpectatorAutopilot();
    setTimeout(tickSpecatorAutopilot, timeEstimation * 1000);
}

tickSpecatorAutopilot();
