java -jar compiler.jar \
--js ../src/polyfills/bind.js \
--js ../src/polyfills/forEach.js \
--js ../src/polyfills/requestAnimationFrame.js \
--js ../src/polyfills/hiResTimer.js \
--js ../src/polyfills/objectCreate.js \
--js ../src/Fx.js \
--js ../src/collections/ArrayIterator.js \
--js ../src/collections/HashMap.js \
--js ../src/collections/Stack.js \
--js ../src/collections/Queue.js \
--js ../src/collections/Sequencer.js \
--js ../src/geom/Circle.js \
--js ../src/geom/GeomUtils.js \
--js ../src/geom/Line.js \
--js ../src/geom/Point.js \
--js ../src/geom/Rectangle.js \
--js ../src/geom/Spline.js \
--js ../src/geom/Vector2.js \
--js ../src/math/MathUtils.js \
--js ../src/math/Percent.js \
--js ../src/math/Range.js \
--js ../src/time/Oscillator.js \
--js ../src/time/Timer.js \
--js ../src/time/Renderer.js \
--js ../src/time/PrecisionTimer.js \
--js ../src/utils/CanvasUtils.js \
--js ../src/utils/CookieUtils.js \
--js ../src/utils/Date.js \
--js ../src/utils/Scale.js \
--js ../src/utils/DelayCall.js \
--js ../src/utils/Keycode.js \
--js ../src/utils/LocalStorageUtils.js \
--js ../src/utils/Mouse.js \
--js ../src/utils/Object.js \
--js ../src/utils/QueryString.js \
--js ../src/utils/String.js \
--js ../src/utils/System.js \
--js ../src/utils/Type.js \
--js ../src/utils/Uri.js \
--js_output_file ../dist/fx.min.js
echo "Done!"