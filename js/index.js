/**
 * ITCAST WEB
 * Created by zhousg on 2016/7/16.
 */
$(function(){
    /*�ֲ�ͼ*/
    banner();
    /*��Ʒҳǩ����*/
    productTab();
    /*��ʼ��������ʾ*/
    $('[data-toggle="tooltip"]').tooltip();
});

/*��̬��Ӧʽ�ֲ�ͼ*/
function banner(){
    /*
    * 1.׼������    json��ʽ������
    * 2.��������ת����html�ṹ  ֮ǰ��������ƴ���ַ���  �����ڣ�ģ������  underscore template������
    *   �жϵ�ǰ���ƶ��˻��Ƿ��ƶ���  ������Ҫ��Ⱦ��html�ṹ
    * 3.��Ⱦ��ҳ�浱��
    * 4.��������Ļ�Ŀ��  html�ṹ���л�  ��Ⱦ
    * */


    /*׼������ */
    var imageList = [
        {
            bac:'images/slide_01_2000x410.jpg',
            img:'images/slide_01_640x340.jpg'
        },
        {
            bac:'images/slide_02_2000x410.jpg',
            img:'images/slide_02_640x340.jpg'
        },
        {
            bac:'images/slide_03_2000x410.jpg',
            img:'images/slide_03_640x340.jpg'
        },
        {
            bac:'images/slide_04_2000x410.jpg',
            img:'images/slide_04_640x340.jpg'
        }
    ]

    /*2.��������ת����html�ṹ*/
    /*3.��Ⱦ��ҳ�浱��*/
    /*��Ⱦhtml�ṹ��ҳ�����*/
    var renderHtml = function(){
        /*�����ƶ��˻��Ƿ��ƶ���*/
        var width = $(window).width();
        /*���С��768���Ƕ���Ϊ���ƶ���*/
        var isMobile = width < 768 ? true : false;

        /*׼����ģ��*/
        var pointTemplate = $('#point_template').html();
        var imageTemplate = $('#image_template').html();
        /*ģ�淽��*/
        var pointFuc = _.template(pointTemplate);
        var imageFuc = _.template(imageTemplate);
        /*�������ݳ�html�ṹ*/
        var pointHtml = pointFuc({model:imageList});
        var imageHtml = imageFuc({
            model:{
                list:imageList,
                isM:isMobile
            }
        });
        /*��Ⱦ��ҳ�浱��*/
        $('.carousel-indicators').html(pointHtml);
        $('.carousel-inner').html(imageHtml);
    }

    /*4.��������Ļ�Ŀ��  html�ṹ���л�  ��Ⱦ*/
    /*��Ļ�ߴ�ı��¼�*/
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');

    /*5.�ƶ��˻����л�*/
    var startX = 0;
    var moveX= 0;
    var distanceX =0;
    var isMove = false;

    /*originalEvent��¼����ԭ����touch�¼�������*/
    $('.wjs_banner').on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        /*ʲô�������  ��  �һ�   �����ľ��볬����50���㻬��*/
        if(isMove && Math.abs(distanceX) > 50){
            /*��һ�� �һ�*/
            if(distanceX>0){
                $('.carousel').carousel('prev');
            }
            /*��һ�� ��*/
            else{
                $('.carousel').carousel('next');
            }
        }
        /*���ò���*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove= false;
    });
}

/*��Ʒҳǩ����*/
function productTab(){
    /*
    * 1.��һ��������
    * 2.������  �Ŀ��Ҫ�������е�li�Ŀ��
    * 3.������Ч��
    * */

    var parent = $('.nav-tabs-parent');

    var child = parent.find('.nav-tabs');

    var lis = child.find('li');

    var width = 0;
    /*2.������  �Ŀ��Ҫ�������е�li�Ŀ��*/
    $.each(lis,function(index,dom){

        width += $(dom).innerWidth();
        /*
        * 1. width ȡ�������ݵĿ��
        * 2.innerWidth ȡ�������ݵĿ�ȼ����ڱ߾�Ŀ��
        * 3.outerWidth ȡ�������ݼ��ڱ߾�ӱ߿�
        * 4.outerWidth(true)  ���� �ڱ߾� �߿� ��߾�
        * */


    });

    child.width(width);

    /*3.������Ч��*/

    itcast.iScroll({
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:50
    });

}
