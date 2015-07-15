{
$animations:{
	"$it.Name$": {
        "wrapMode": "$it.Wrapmode$",
        "length": $it.Length$,
        "samplingRate": $it.SamplingRate$,
        "numSamples": $it.NumSamples$,
        "quaternions":$if(quaternions)$ true$else$ false$endif$,
        "properties": {$it.Properties:{
            "$it.Name$": [$it.SamplesEx; separator=","$],}$
        }
	},
}$
}