<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="perfect-scrollbar-off nav-open">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="canonical" href="http://127.0.0.1"/>

    <title>{{ config('app.name', 'OWC') }}</title>
    <!-- Favicon -->
    <link href="{{asset('favicon.svg')}}" rel="icon" type="image/png">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- Icons -->
    <link href="{{ asset('argon/vendor/nucleo/css/nucleo.css') }}" rel="stylesheet">
    <link href="{{ asset('argon/vendor/@fortawesome/fontawesome-free/css/fontawesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('argon/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('argon/css/util.css') }}" rel="stylesheet">
    <link href="{{ asset('argon/css/main.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/components-v2.css')}}">
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.3.0/mdb.min.css"
        rel="stylesheet"
    />
    <link href="{{asset('css/app.css')}}" rel="stylesheet">
    <!-- Argon CSS -->
    <link type="text/css" href="{{ asset('argon/css/argon.css?v=1.0.0') }}" rel="stylesheet">
</head>
<body class="g-sidenav-pinned bg-white">
<div id="loader-wrapper" style="display: block">
    <div class="tt-loading-center">
        <div class="tt-loading-center-absolute">
            <div class="tt-object object_four"></div>
            <div class="tt-object object_three"></div>
            <div class="tt-object object_two"></div>
            <div class="tt-object object_one"></div>
        </div>
    </div>
    <div id="loading-text">Loading ...</div>
</div>
<div id="root"></div>
<img rel="prefetch" src="{{asset('/assets/img/theme/spinner.gif') }}" alt="img" class="d-none">
<script src="{{ asset('argon/vendor/jquery/dist/jquery.min.js') }}"></script>
<!-- <script src="{{ asset('argon/vendor/@fortawesome/fontawesome-free/js/all.min.js') }}"></script> -->
{{--<script src="//kit.fontawesome.com/0be66f9bc5.js" crossorigin="anonymous"></script>--}}
<script src="{{ asset('argon/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('argon/js/vendor/mdb-ui-kit/3.3.0/mdb.min.js') }}"></script>
<script type="text/javascript" src="{{asset('argon/js/vendor/moment.js/2.21.0/moment.min.js')}}"></script>
<script src="{{asset('argon/js/bootstrap-datetimepicker.min.js')}}"></script>
<script>
    $.getScript("{{asset('js/app.js')}}", () => {
        $('#loader-wrapper').fadeOut()
    })
</script>

@stack('js')

<!-- Argon JS -->
<script src="{{ asset('argon/vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js') }}"></script>
<script src="{{ asset('argon/js/argon.js?v=1.0.0') }}"></script>

</body>
</html>
