module Main exposing (main)

import Browser
import Html exposing (Html, canvas)
import Html.Attributes exposing (class, id)


type alias Model =
    { canvasId : String
    }


init : Model -> ( Model, Cmd msg )
init model =
    ( model, Cmd.none )


view : Model -> Html msg
view model =
    canvas [ id model.canvasId, class "canvas" ] []


update : Model -> Model -> ( Model, Cmd Model )
update a b =
    ( b, Cmd.none )


subscriptions : Model -> Sub Model
subscriptions model =
    Sub.none


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
