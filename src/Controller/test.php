<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class test extends AbstractController
{
    const POSTS= [
        ['id' => 1, 'title' => 'laravel 6'],
        ['id' => 2, 'title' => 'ReactJs'],
        ['id' => 3, 'title' => 'Angular']
    ];

    /**
     * @Route("/test")
     */
    public function index(){
        return new JsonResponse(self::POSTS);
    }


    /**
     * @Route("/test/{id}, requirements= {"id: "\d+"})
     */
    /*public function postById($id){
        return new JsonResponse( self::POSTS[array_search($id, \array_column(self::POSTS , 'id') )]  );
    }*/

    /**
     * @Route("/test/{title})
     */
    /*public function postByTitle($title){
        return new JsonResponse(self::POSTS[array_search($title, \array_column(self::POSTS , 'title') ) ]);
    }*/


    /**
     * @Route("/lucky/number")
     */
    public function number(): Response
    {
        $number = random_int(0, 100);

        return $this->render('lucky/number.html.twig', [
            'number' => $number,
        ]);
    }
}
